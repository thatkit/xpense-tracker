const express = require('express');

const router = express.Router();

// Expense model
const Expense = require('../../models/Expenses');

// @ route      GET api/expenses
// @ desc       GET all expenses
// @ access     Public
router.get('/', (req, res) => {
    Expense
        .find()
        .then(expenses => res.json(expenses));
});

module.exports = router;