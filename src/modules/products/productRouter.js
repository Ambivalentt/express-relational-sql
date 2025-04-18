const express = require('express');
const router = express.Router()
const createProduct = require('./productControllers.js')

router.post('/addProduct', createProduct )

module.exports = router