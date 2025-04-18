const db = require('../../config/server.js');

class Payments {
    static async create({order_id, payment_date, user_id}){
        Validation.order_id(order_id);
        Validation.payment(payment_date);
        Validation.user_id(user_id);

        const queryOrderId = "SELECT id FROM orders WHERE id = ? AND status = 'pending'";
        const [order] = await db.promise().query(queryOrderId, [order_id]);
        if (order.length === 0) throw new Error('Order not found or already paid');

        const queryEditStatus = "UPDATE orders SET status = 'paid' WHERE id = ? AND customer_id = ?";
        await db.promise().query(queryEditStatus, [order_id, user_id]);

        const query = "INSERT INTO payments (orders_id, payment_date, user_id) VALUES (?, ?, ?)";
        const [result] = await db.promise().query(query, [order_id, payment_date, user_id]);
        return result;
    }
}

class Validation{
    static order_id(order_id){
        if (typeof order_id !== 'number') throw new Error('Order ID not found')
        if (order_id <= 0) throw new Error('Order ID must be greater than 0')
    }
    static payment(date){
        if (typeof date !== 'string') throw new Error('Payment method not found')
    }
    static user_id(user_id){
        if (typeof user_id !== 'number') throw new Error('User ID not found')
        if (user_id <= 0) throw new Error('User ID not found')
       
    }
}

module.exports = Payments