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
    // passing positive sumChange to req
    req.sumChange = req.body.sum;

    // Creating ID for the item
    const itemId = new mongoose.Types.ObjectId();

    // Saving the item in Item model
    const newItem = new Item({
        _id: itemId,
        name: req.body.name,
        desc: req.body.desc,
        sum: req.body.sum    
    });

    newItem
        .save()
        .then(item => {
            res.json(item);

            // Saving the item ID in List model
            List
                .findOneAndUpdate(
                    { listId: req.body.listId },
                    { $push: { items: itemId } }
                )
                .then(list => null);

            next();
        })
        .catch(catchCallback);
});

// @route           PUT api/items
// @description     Update an item
// @access          Private
router.put('/', auth, (req, res, next) => {
    // data container for substracting prev value and adding new one, if there's any
    let sumChange = 0;

    Item
        .findById(req.body.itemId)
        .then(item => {
            // first, we substract prev sum value from sumChange
            sumChange -= item.sum;
            
            // then, we update the item with new values
            Item
                .findByIdAndUpdate(item._id, {
                    name: req.body.name,
                    desc: req.body.desc,
                    sum: req.body.sum
                }, { returnDocument: 'after' })
                .then(newItem => res.json(newItem));
            
            // passing positive or negative sumChange to req
            req.sumChange = sumChange + req.body.sum;

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

            res.json({ id: req.params.itemId });

            // Removing the item ID from List model
            List
                .findOneAndUpdate(
                    { listId: req.body.listId },
                    { $pull: { items: req.params.itemId } }
                );

            next();
        })
        .catch(catchCallback);
});

// @route           ALL api/items
// @description     Aggregation of List's totalCosts and remainder
// @access          ADMIN
router.all('*', auth, (req, res) => {
    console.log(`sum change: ${req.sumChange}`);
});

// @route           GET api/items
// @description     GET All Items
// @access          ADMIN
router.get('/all', (req, res) => {
    Item
        .find()
        .sort({ date: 1 })
        .then(items => res.json(items))
});

module.exports = router;