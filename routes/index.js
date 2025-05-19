const express = require('express')
const router = express.Router()
const admin = require('./admin')
const client = require('./client')

router.use('/client', client)
router.use('/admin', admin)

module.exports = router