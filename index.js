const express = require('express');
const app = express();
const db = require('./src/config/server.js');
const userRouter = require('./src/modules/users/userRouter.js');
const cookies = require('cookie-parser');
const productRouter = require('./src/modules/products/productRouter.js')
const orderRouter = require('./src/modules/orders/orderRouter.js')
const paymentRouter = require('./src/modules/payments/paymentRourter.js')

app.use(cookies());
app.use(express.json());

app.use('/api/product', productRouter)
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter)
app.use('/api/payment', paymentRouter)
app.use((req, res) =>{
    res.status(404).json({error: 'eror 404 page not found'})
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});