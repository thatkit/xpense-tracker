const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: './config/.env' });

const app = express();

// Bodyparser Middleware
app.use(express.json());

mongoose
    .connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.fmalu.mongodb.net/xpense-tracker?retryWrites=true&w=majority`)
    .then(() => console.log('MongoDB connected'))
    .catch(e => console.log(e));

// Use Routes
app.use('/api/lists', require('./routes/api/lists'));
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in PRODUCTION
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on ${port}`));