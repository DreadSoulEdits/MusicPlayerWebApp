const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");

const userRoute = require("./routes/userRoute");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use("api/v1", userRoute);
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../frontend/public")));

// Routes
app.get("/", (req, res) => {
    res.send("This is home Page");
});

app.get("/signup", (req, res) => {
    const signupPath = path.join(__dirname, "../frontend/Login&SignUp_Index.html");
    res.sendFile(signupPath);
    // console.log(__dirname);
})

// connect to DB
const PORT = process.env.PORT || 3000;
mongoose.
    connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening to Port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    });
