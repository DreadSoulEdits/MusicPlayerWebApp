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

app.use(express.static(path.join("../frontend/public")));

// Routes
app.get("/", (req, res) => {

    const homepagePath = path.join(__dirname, "../frontend/public/homePage.html");
    res.sendFile(homepagePath);
});


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
