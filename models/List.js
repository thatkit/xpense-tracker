const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'item'
    }],
    totalBudget: {
        type: Number,
        required: true
    },
    totalCosts: {
        type: Number,
        default: 0
    },
    remainder: {
        type: Number,
        default: 0
    }
});

module.exports = List = mongoose.model('list', ListSchema);