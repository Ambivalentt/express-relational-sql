const db = require('../../config/server.js');

class OrderItemsRepository {
    static async getItemsAndCreate(items, order_id) {
        for (const item of items) {
            const [productsResults] = await db.promise().query("SELECT * FROM products WHERE id = ?", [item.product_id]);
            if (productsResults.length === 0) {
                throw new Error(`Product with ID ${item.product_id} not found`);
            }
            const unit_price = productsResults[0].price;
            await db.promise().query("INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)", [order_id, item.product_id, item.quantity, unit_price]);
        }
    }
}

module.exports = OrderItemsRepository