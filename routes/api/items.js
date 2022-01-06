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
router.post('/', auth, (req, res) => {
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
        .then(item => res.json(item))
        .catch(catchCallback);

    // Saving the item ID in List model
    List
        .findOneAndUpdate(
            { listId: req.body.listId },
            { $push: { items: itemId } }
        )
        .catch(catchCallback);
});

// @route           PUT api/items
// @description     Update an item
// @access          Private
router.put('/', auth, (req, res) => {
    res.send('updating item...');
});

// @route           DELETE api/items/:itemId
// @description     Delete an item
// @access          Private
router.delete('/:itemId', auth, (req, res) => {
    // Removing the item from Item model
    Item
        .findById(req.params.itemId)
        .then(item => item
            .remove()
            .then(() => res.json({ id: req.params.itemId })))
        .catch(catchCallback);

    // Removing the item ID from List model
    List
        .findOneAndUpdate(
            { listId: req.body.listId },
            { $pull: { items: req.params.itemId } }
        )
        .catch(catchCallback);
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