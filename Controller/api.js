const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Indiatourism = require('../Model/userModel')


require('dotenv').config()
const secretkey = process.env.secretkey

const register = async (req, res) => {
    try {
        const saltRound = 10; // Define saltRound here

        const { firstname, email, password } = req.body;

        // Check if user with the provided email already exists
        const existingUser = await Indiatourism.findOne({ email: email });

        if (existingUser) {
            return res.send({msg:"This email is already registered"});
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, saltRound);

        // Create a new user with hashed password
        const newUser = await Indiatourism.create({ firstname, email, password: hashedPassword });

        // Generate JWT token
        const jwtToken = jwt.sign({ user: newUser.email,firstname }, secretkey);

        res.send({ msg: "User Registered successfully", newUser: newUser, jwtToken: jwtToken });
    } catch (error) {
        res.send({ error: "Internal Server Error", error });
    }

}

const login = async (req, res) => {
    try {
        const loginData = req.body; // body parsing

        // Find the user with the provided email
        const account = await Indiatourism.findOne({ email: loginData.email,firstname:loginData.firstname }); //,{firstname:loginData.firstname}
        console.log(account, 'account');

        if (account) {
            // Compare the login password with the hashed password stored in the database
            const login = bcrypt.compareSync(loginData.password, account.password);
            console.log(login, 'login');

            if (login) {
                const jwtToken = jwt.sign({user:loginData.email,firstname:loginData.firstname}, secretkey, { expiresIn: '365d' });
                return res.send({msg:'User logged in successfully', jwtToken:jwtToken});
            } else {
                return res.send('Password is incorrect');
            }
        } else {
            return res.send('User is not registered');
        }
    } catch (error) {
        return res.send({ error: 'Internal Server Error' });
    }
}


const product = async(req,res)=>{
    try{
        const allUser = await Indiatourism.find()
        res.send(allUser)
    }
    catch(error){
        res.send(error,"error")
    }
}



const tourpackage = (req,res)=>{
    res.send({msg:'This is tour package'})
}


const touroffer = (req,res)=>{
    res.send({msg:'This is tour offer'})
}

module.exports = {register,login,product,tourpackage,touroffer}