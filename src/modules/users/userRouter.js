const { createUser, login } = require('./customerControllers.js')
const express = require('express')
const router = express.Router()

router.post('/register', createUser)
router.post('/login', login)
module.exports = router