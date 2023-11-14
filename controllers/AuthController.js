const User = require ("../models/UserModel");
const bcrypt = require('bcryptjs');
const { createSecretToken } = require("../util/SecretToken");

module.exports.Signup = async (req, res, next) => {
    try{
        const { email, password, username, createdAt } = req.body;
        if(!email || !password || !username){
            return res.json({message: 'All fields are required'})
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.json({message: "User already exists"})
        }
        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            widthCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "Account Created Successfully!", success: true, user});
        next();
    } catch(error){
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.json({message: 'All fields are required'})
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.json({message: "Incorrect Password or Email"})
        }
        const auth = await bcrypt.compare(password,user.password)
        if(!auth) {
            return res.json({message: "Incorrect Password or Email"})
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            widthCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "Account Created Successfully!", success: true});
        next();
    } catch(error){
        console.error(error);
    }
}