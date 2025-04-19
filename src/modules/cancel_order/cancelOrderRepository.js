const db = require('../../config/server.js');

class CancelOrdernRepository {
    static async create({order_id, user_id}) {
        Validation.order_id(order_id);
        if (typeof order_id !== 'number') throw new Error('Order ID must be a number')
        const queryStatus = "SELECT id, status FROM orders WHERE id = ? AND customer_id = ?"
        const [resultStatus] = await db.promise().query(queryStatus, [order_id, user_id]);
        if (resultStatus.length === 0) throw new Error('Order ID not found')
        Validation.paid(resultStatus[0].status)
        Validation.cancelled(resultStatus[0].status)

        const query = "UPDATE orders SET status = 'cancelled' WHERE id = ? AND status = 'pending'";

        const [results] = await db.promise().query(query, [order_id]);
        return results.insertId;
    }
}

class Validation {
    static order_id(order_id) {
        if (typeof order_id !== 'number') throw new Error('Error in order ID type')
        if (order_id <= 0) throw new Error('Order ID must be greater than 0')
    }
    static paid(status) {
        if (status === 'paid') throw new Error('order was paid already')
    }
    static cancelled(status) {
        if (status === 'cancelled') throw new Error('order was cancelled already')
    }
}
module.exports = CancelOrdernRepository