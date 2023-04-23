const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

// Encrypt password before saving to DB

userSchema.pre("save", async function(next) {
    
    if (!this.isModified("password")) {
        return next();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;