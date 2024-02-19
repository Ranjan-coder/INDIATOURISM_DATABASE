const express = require('express')
const { register, login, product, tourpackage, touroffer } = require('../Controller/api')
const auth = require('../Middleware/auth')
const routes = express.Router()


routes.post('/register',register)
routes.post('/login',login)
routes.get('/data',product)
routes.get('/tourpackage',auth,tourpackage)
routes.get('/touroffer',auth,touroffer)


module.exports = {routes}