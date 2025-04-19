const express = require('express');
const router = express.Router();
const cancelOrder = require('./cancelOrderController.js');

router.post('/create', cancelOrder);

module.exports = router;