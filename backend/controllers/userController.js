const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");


const signUp = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

});

const signIn = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

});

module.exports = {
    signUp,
    signIn,
}