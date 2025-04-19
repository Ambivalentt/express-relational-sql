const db = require('../../config/server.js');

class OrdersRepository {
    static async create(items, { customer_id, order_date }) {
        Validation.customer_id(customer_id);
        Validation.order_date(order_date);
        let total_amount = 0
        let products= []
        for (const item of items) {
            const query = "SELECT price, name FROM products WHERE id = ?"
            const [productResults] = await db.promise().query(query, [item.product_id])      
            if (productResults.length === 0) {
                throw new Error(`Product with ID ${item.product_id} not found`);
            }
            const unit_price = productResults[0].price;
            total_amount += unit_price * item.quantity
            products.push({product:productResults[0].name, quantity:item.quantity, price:productResults[0].price})
        }
        const query = "INSERT INTO orders (customer_id, order_date, total_amount) VALUES (?, ?, ?)"
        const [result] = await db.promise().query(query, [customer_id, order_date, total_amount]);
        
        return {userID:result.insertId, products, total_amount}
    }
}

class Validation {
    static product_id(product_id) {
        if (typeof product_id !== 'number') throw new Error('Product ID must be a number')
        if (product_id <= 0) throw new Error('Product ID must be greater than 0')
    }
    static customer_id(customer_id) {
        if (typeof customer_id !== 'number') throw new Error('Customer ID must be a number')
        if (customer_id <= 0) throw new Error('Customer ID must be greater than 0')
    }
    static order_date(order_date) {
        if (typeof order_date !== 'string') throw new Error('Order date must be a string')
    }

}

module.exports = OrdersRepository