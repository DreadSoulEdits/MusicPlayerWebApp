const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const path = require('path');


const signUp = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.send("Please add the required fields.");
    }

    // check if user already exist
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists. Please login");
    }

    const user = await User.create({
        name, 
        email,
        password
    });

    if (userExists && email == user.email && password == user.password) {
        
        const homepagePath = path.join(__dirname, "../frontend/public/homePage.html");
        res.redirect(homepagePath);
    }

});

const signIn = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    
    const userExists = User.findOne(email);
    if (!userExists) {
        res.send("User not found, please login");
    }

    const user = await User.findOne({ email })
});

module.exports = {
    signUp,
    signIn,
}