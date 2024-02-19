const express = require('express')
const app = express()
const cors = require('cors')
const {routes} = require('./Routes/routesData')
const connectDB = require('./Config/db')

require('dotenv').config()
const port = process.env.PORT

app.use(cors({
    origin:'*'
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/user',routes)


app.listen(port,()=>{
    connectDB()
    console.log('Server is running');
})