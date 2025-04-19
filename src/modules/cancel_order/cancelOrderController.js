require('dotenv').config()
const CancelOrder = require('./cancelOrderRepository.js')
const jwt = require('jsonwebtoken')

const cancelOrder = async (req, res) =>{
    try{
        const {order_id, reason} = req.body
        const token = req.cookies.access_token
        if (!token) return res.status(401).json({ error: 'Unauthorized' })
        const decoded = jwt.verify(token, process.env.JWT_PW)
        const user_id = decoded.id
        await CancelOrder.create({order_id, user_id });
        res.status(200).json({message: 'Order cancelled successfully', reason: reason} )
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = cancelOrder