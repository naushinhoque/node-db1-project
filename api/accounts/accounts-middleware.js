const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 }
  const {name, budget} = req.body
  if(name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
    next(error)
  } else if (typeof name !== 'string') {
    error.message = 'name must be a string'
    next(error)
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name much be bw 3 - 100 characs'
    next(error)
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget must be a number'
    next(error)
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget is too large or too small'
    next(error)
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
console.log('checkAccountNameUnique')
  next()
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'not found'})
    } else {
      req.account = account
      next()
    }
  } catch(err) {
    next(err)
  }
}
