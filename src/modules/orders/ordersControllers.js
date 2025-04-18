require('dotenv').config()
const OrdersRepository = require('./ordersRepository');
const jwt = require('jsonwebtoken')
const createOrderItems = require('../order_items/orderItemsRepository.js')

const createOrder = async (req, res) => {
    try {
        const { order_date, items } = req.body
        const token = req.cookies.access_token
        if (!token) return res.status(401).json({ error: 'Unauthorized' })
        const decoded = jwt.verify(token, process.env.JWT_PW)
        const customer_id = decoded.id

        const newOrder = await OrdersRepository.create(items, { customer_id, order_date })
        await createOrderItems.getItemsAndCreate(items, newOrder.userID)
        res.status(201).json({ message: 'Order created successfully', order:newOrder.products, total_amount:newOrder.total_amount })   
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
module.exports = createOrder