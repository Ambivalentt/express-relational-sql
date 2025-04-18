const UserRepository = require('./customerRepository.js')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const createUser = async (req, res) =>{
    try{
        const { first_name, last_name, email, password, phone } = req.body
        const result = await UserRepository.create({ first_name, last_name, email, password, phone })
        res.status(201).json({message: 'User created successfully', userId: result.insertId})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const login = async (req, res) =>{
    try{
        const results = await UserRepository.login(req.body)
        const token = jwt.sign(
            {id: results.id, 
            email: results.email, 
            first_name: results.first_name, 
            last_name: results.last_name, 
            phone: results?.phone}, process.env.JWT_PW, {expiresIn: '1h'})
        res.cookie('access_token', token, {httpOnly: true})
        res.status(200).json({message: 'Login successful', results, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}
module.exports = {createUser, login}