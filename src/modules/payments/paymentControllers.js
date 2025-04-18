require('dotenv').config()
const PaymentRepository = require('./paymentsRepository.js');
const jwt = require('jsonwebtoken')

const createPayment = async (req, res) => {
    try{
        const {order_id, payment_date, method} = req.body
        const token = req.cookies.access_token
        if (!token) return res.status(401).json({ error: 'Unauthorized' })
        const decoded = jwt.verify(token, process.env.JWT_PW)
        const user_id = decoded.id
        await PaymentRepository.create({order_id, payment_date, method, user_id})
        res.status(201).json({message: 'Payment created successfully'})

    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = createPayment