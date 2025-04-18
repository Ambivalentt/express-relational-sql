const express = require('express')
const router = express.Router()
const createPayment = require('./paymentControllers.js')

router.post('/create', createPayment)


module.exports = router