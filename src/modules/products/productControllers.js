const Product = require('./productRepository.js');

const createProduct= async (req, res) => {
    try{
        const results = await Product.create(req.body)
        console.log(results)
        res.status(201).json({message: 'Product created successfully', productId: results.insertId})
    }catch(err){
        res.status(400).json({error: err.message})
    }   
}

module.exports = createProduct