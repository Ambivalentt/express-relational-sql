const createOrder = require('./ordersControllers.js')
const express = require('express')
const router = express.Router()


router.post('/createOrder', createOrder)

module.exports = router