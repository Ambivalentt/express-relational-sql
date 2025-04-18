const db = require('../../config/server.js')


class ProductRepository {
    static async create({ name, price, description, stock }) {
        Validation.name(name);
        Validation.price(price);
        Validation.description(description);
        Validation.stock(stock);
        const query = "INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)"
        const [results] = await db.promise().query(query, [name, price, description, stock]);
        return results
    }
}


class Validation {
    static name(name) {
        if (name.length < 3) throw new Error('Name must be at least 3 characters long')
        if (typeof name !== 'string') throw new Error('Name must be a string')
    }
    static price(price) {
        if (typeof price !== 'number') throw new Error('Price must be a number')
        if (price <= 0) throw new Error('Price must be greater than 0')
    }
    static description(description) {
        if (description.length < 3) throw new Error('Description must be at least 3 characters long')
        if (typeof description !== 'string') throw new Error('Description must be a string')
    }
    static stock(stock) {
        if (typeof stock !== 'number') throw new Error('Stock must be a number')
        if (stock <= 0) throw new Error('Stock must be greater than 0')
    }
}

module.exports = ProductRepository