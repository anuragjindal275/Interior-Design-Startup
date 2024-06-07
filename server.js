require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware to handle the connection status
app.use((req, res, next) => {
    if (mongoose.connection.readyState != 1) {
        console.log('MongoDB is not connected yet.');
    }
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');

app.use('/', indexRouter);
app.use('/', contactRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
