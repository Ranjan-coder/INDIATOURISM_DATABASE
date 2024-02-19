const mongoose = require('mongoose')

require('dotenv').config()
const password = process.env.PASSWORD

const connectDB = async ()=>{
    try{
        // await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
        await mongoose.connect(`mongodb+srv://ranjancoder:${password}@prebytes.xpxfy4o.mongodb.net/Indiatourism?retryWrites=true&w=majority`)
        console.log('connect to DB');
    }
    catch(err){
        console.error('connect to DB failed')
    }
}

module.exports = connectDB