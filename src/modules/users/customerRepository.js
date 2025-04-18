const db = require('../../../src/config/server.js')
const bcrypt = require('bcryptjs')

class UserRepository {
    static async create({ first_name, last_name, email, password, phone }) {
        Validation.email(email);
        Validation.first_name(first_name);
        Validation.last_name(last_name);
        Validation.cleanPhone(phone);
        
        const pw_hash = await bcrypt.hash(password, 10)
        const query = "INSERT INTO customers (first_name, last_name, email, password, phone) VALUES (?, ?, ?,?,?)"
        const [result] = await db.promise().query(query, [first_name, last_name, email, pw_hash, phone]);
        return result
    }

    static async login({ email, password }) {
        Validation.email(email)
        const query = "SELECT * FROM customers WHERE email = ?"
        const [result] = await db.promise().query(query, [email]);
        if (result.length === 0) throw new Error('incorrect email')
        const passwordDB = await bcrypt.compare(password, result[0].password)
        if (!passwordDB) throw new Error('Incorrect password');
        const user = {
            id: result[0].id,
            email: result[0].email,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            phone: result[0].phone,
        }
        return user;
    }

}

class Validation {
    static email(email) {
        if (email.length < 3) throw new Error('Email must be at least 3 characters long')
        if (typeof email !== 'string') throw new Error('Email must be a string')

    }
    static first_name(first_name) {
        if (first_name.length < 3) throw new Error('Name must be at least 3 characters long')
        if (typeof first_name !== 'string') throw new Error('Name must be a string')
    }
    static last_name(last_name) {
        if (last_name.length < 3) throw new Error('Name must be at least 3 characters long')
        if (typeof last_name !== 'string') throw new Error('Name must be a string')
    }
    static cleanPhone (phone) {
        if (typeof phone !== 'string') throw new Error('Phone must be a string')
        if (phone.length < 10) throw new Error('Phone must be at least 8 numbers long')
    };
   
}

module.exports = UserRepository