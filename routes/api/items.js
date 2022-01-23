const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const router = express.Router();
const List = require('../../models/List'); // List Model
const Item = require('../../models/Item'); // Item Model
const catchCallback = require('../../helpers/errorHandling');

// @route           POST api/items
// @description     Create an item
// @access          Private
router.post('/', auth, (req, res, next) => {
    // request body
    const { listId, name, desc, sum } = req.body;

    // passing positive sumChange to req
    req.sumChange = sum;

    // Creating ID for the item
    const itemId = new mongoose.Types.ObjectId();

    // Saving the item in Item model
    const newItem = new Item({
        _id: itemId,
        name,
        desc,
        sum  
    });

    newItem
        .save()
        .then(item => {

            // Saving the item ID in List model
            List
                .findByIdAndUpdate(listId, { $push: {items: itemId} })
                .then(list => {
                    res.json(item)
                    next();
                });

        })
        .catch(catchCallback);
});

// @route           PUT api/items
// @description     Update an item
// @access          Private
router.put('/', auth, (req, res, next) => {
    // data container for substracting prev value and adding new one, if there's any
    req.sumChange = 0;

    Item
        .findById(req.body.itemId)
        .then(item => {
            // first, we substract prev sum value from sumChange
            req.sumChange -= item.sum;

            // then, we update the item with new values
            Item
                .findByIdAndUpdate(item._id, {
                    name: req.body.name,
                    desc: req.body.desc,
                    sum: req.body.sum
                }, { returnDocument: 'after' })
                .then(newItem => res.json(newItem));
            
            // passing positive or negative sumChange to req
            req.sumChange += req.body.sum;

            next();
    }).catch(catchCallback);  
});

// @route           DELETE api/items/:itemId
// @description     Delete an item
// @access          Private
router.delete('/:itemId', auth, (req, res, next) => {
    // Removing the item from Item model
    Item
        .findByIdAndRemove(req.params.itemId)
        .then(item => {
            // passing negative sumChange to req
            req.sumChange = -item.sum;

            // Removing the item ID from List model
            List
                .findByIdAndUpdate(req.body.listId, { $pull: {items: req.params.itemId} })
                .then(list => {
                    res.json({ id: req.params.itemId })
                    next();
                });
        })
        .catch(catchCallback);
});

// @route           GET api/items
// @description     GET All Items
// @access          ADMIN
router.get('/all', (req, res) => {
    Item
        .find()
        .sort({ date: 1 })
        .then(items => res.json(items));
});

// @route           ALL api/items
// @description     Aggregation of List's totalCosts and remainder
// @access          Private
router.all('*', auth, (req, res) => {
    if (!req.sumChange) return;

    console.log(req.body);
    console.log(`sum change: ${req.sumChange}`);
});

module.exports = router;