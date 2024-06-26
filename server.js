// DEPENDENCIES
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { Types } = require('mongoose')
const classController = require("./controllers/classControl")
require('dotenv').config()
// const Class = require('./models/class');

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

connectDB();

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/classes', classController)

// Splash Page
app.get('/', (req, res) => {
    res.render('splash.ejs')
});

// PORT
app.listen(port, () => {
    console.log(`Listening on `, port);
});
