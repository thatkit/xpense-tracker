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
    const { listId, name, desc } = req.body;
    const sum = Number(req.body.sum);

    // simple validation
    if (!listId || !name || !desc || !sum) {
        return res.status(400).json({ message: 'Request must include listId, name, desc, sum' });
    }

    // passing positive sumChange to req
    req.sumChange = sum;

    // Creating ID for the item
    const itemId = new mongoose.Types.ObjectId();

    // Saving the item in Item model
    const newItem = new Item({
        _id: itemId,
        listId,
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
                .then(() => {
                    res.status(200).json(item);
                    next();
                });

        })
        .catch(catchCallback);
});

// @route           PUT api/items
// @description     Update an item
// @access          Private
router.put('/', auth, (req, res, next) => {
    // request body
    const itemId = req.body.itemId;
    const newName = req.body.name;
    const newDesc = req.body.desc;
    const newSum = Number(req.body.sum);

    // validating req.body.itemId
    if (!itemId) return res.status(400).json({ message: 'There is no itemId' });

    Item
        .findById(itemId)
        .then(item => {
            // first, we substract prev sum value from sumChange
            req.sumChange = 0;
            req.sumChange -= item.sum;

            // then, we update the item with new values
            Item
                .findByIdAndUpdate(item._id, {
                    name: newName,
                    desc: newDesc,
                    sum: newSum
                }, { returnDocument: 'after' })
                .then(updatedItem => {
                    // finally, we add new sum value to sumChange
                    req.sumChange = req.sumChange + updatedItem.sum;
                    // adding listId to req for '*' aggregation request
                    req.body.listId = updatedItem.listId.toString();

                    res.status(200).json(updatedItem);
                    next();
                });
            
    }).catch(catchCallback);  
});

// @route           DELETE api/items/:itemId
// @description     Delete an item
// @access          Private
router.delete('/:itemId', auth, (req, res, next) => {
    const itemId = req.params.itemId;
    const listId = req.body.listId;
    
    // Removing the item from Item model
    Item
        .findByIdAndRemove(itemId)
        .then(item => {
            // passing negative sumChange to req
            req.sumChange = 0;
            req.sumChange -= item.sum;

            // Removing the item ID from List model
            List
                .findByIdAndUpdate(listId, { $pull: {items: itemId} })
                .then(() => {
                    res.status(200).json({ id: itemId })
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

// @route           GET api/items
// @description     GET the list's items
// @access          ADMIN
router.get('/', auth, (req, res) => {
    const listId = req.body.listId;
    Item
        .find({ listId })
        .then(items => res.status(200).json(items))
        .catch(catchCallback);
});

// @route           ALL api/items
// @description     Aggregation of List's totalCosts and remainder
// @access          Private
router.all('*', auth, (req, res) => {
    if (!req.sumChange) return;

    List
        .findById(req.body.listId)
        .then(list => {
            List.findByIdAndUpdate(req.body.listId, {
                $set: {
                    totalCosts: list.totalCosts + req.sumChange,
                    remainder: list.remainder - req.sumChange,
                }
            }).then(() => {})
        })
        .catch(catchCallback);
});

module.exports = router;