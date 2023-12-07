const router = require('express').Router()
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  try {
    res.json('get account')
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  try {
    res.json('get account by id')
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  try {
    res.json('post account')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  try {
    res.json('update account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  try {
    res.json('delete account')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
