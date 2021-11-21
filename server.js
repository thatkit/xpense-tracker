const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

const expenses = require('./routes/api/expenses');

const app = express();

// Connect to MongoDB
const db = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.fmalu.mongodb.net/xpense-tracker?retryWrites=true&w=majority`;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/expenses', expenses);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}`));