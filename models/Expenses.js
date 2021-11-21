const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
    sum: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'RUB'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    counterparty: {
        type: String,
        required: true
    }
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);