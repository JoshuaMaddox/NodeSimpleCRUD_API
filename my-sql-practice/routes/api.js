const express = require('express')
const router = express.Router()

//Require the new users route
router.use('/users', require('./users'))

module.exports = router