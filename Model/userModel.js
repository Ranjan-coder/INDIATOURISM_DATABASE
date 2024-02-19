const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true 
    }
})


const Indiatourism = mongoose.model('Indiatourism',userSchema)
module.exports = Indiatourism