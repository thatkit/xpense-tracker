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

// @ route      POST api/expenses
// @ desc       POST expense
// @ access     Public
router.post('/', (req, res) => {
    console.log(req.body);
    const newExpense = new Expense({
        sum: req.body.sum,
        counterparty: req.body.counterparty
    });
    newExpense
        .save()
        .then(expense => res.json(expense))
        .catch(err => console.log(err));
});

// @ route      DELETE api/expenses/:id
// @ desc       DELETE expense
// @ access     Public
router.delete('/:id', (req, res) => {
    Expense
        .findByIdAndRemove(req.params.id)
        .then(() => res.json({ id: req.params.id }));
});

module.exports = router;