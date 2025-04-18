const sql = require('mysql2');
require('dotenv').config();

const db = sql.createConnection({
    host: 'localhost',
    user: 'stack',
    password: process.env.MYSQL_PW,
    database: 'store_db'
});

module.exports = db;