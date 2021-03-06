const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User'); // User Model
const List = require('../../models/List'); // List Model
const Item = require('../../models/Item'); // Item Model
const catchCallback = require('../../helpers/errorHandling');

// @route           GET api/lists
// @description     GET all lists
// @access          Private
router.get('/', auth, (req, res) => {
    List
        .find({ userId: req.user.id })
        .then(lists => res.json(lists))
        .catch(catchCallback);
});

// @route           GET api/lists/:listId
// @description     GET a list
// @access          Private
router.get('/:listId', auth, (req, res) => {
    const listId = req.params.listId;
    // validation against incorrect listId type
    if (!mongoose.Types.ObjectId.isValid(listId)) {
        return res.status(400).json({ message: 'Invalid listId' });
    }

    List
        .findById(listId)
        .populate('items')
        .then(list => {
            !list
                // if the listId is incorrect
                ? res.status(400).json({ message: 'Invalid listId' })
                // if the listId is correct
                : res.status(200).json(list)
        })
        .catch(catchCallback);
});

// @route           POST api/lists
// @description     Create a list
// @access          Private
router.post('/', auth, (req, res) => {
    const { name, totalBudget } = req.body;
    // simple req.body validation
    if (!name || !totalBudget) {
        return res.status(400).json({ message: 'Please, fill out name and total budget' });
    }

    // Creating ID for the list
    const listId = new mongoose.Types.ObjectId();
    
    // Saving the list in List model
    const newList = new List({
        _id: listId,
        userId: req.user.id,
        name,
        totalBudget,
        remainder: totalBudget,
    });
    newList
        .save()
        .then(list => {
            // Saving the list ID in User model
            User
                .findOneAndUpdate(
                    { _id: req.user.id },
                    { $push: { lists: listId } }
                )
                .then(() => {
                    res.status(200).json(list);
                });
        })
        .catch(catchCallback);
});

// @route           DELETE api/lists/:id
// @description     Delete a list
// @access          Private
router.delete('/:listId', auth, (req, res) => {
    const listId = req.params.listId;
    // validation against incorrect listId type
    if (!mongoose.Types.ObjectId.isValid(listId)) {
        return res.status(400).json({ message: 'Invalid listId' });
    }

    // Removing the list from List model
    List
        .findByIdAndDelete(listId)
        .then(({ _id }) => res.status(200).json({ id: _id }))
        .catch(catchCallback);

    // Removing the list ID from User model
    User
        .findOneAndUpdate(
            { userId: req.user.id },
            { $pull: { lists: listId } }
        )
        .catch(catchCallback);

    // Removing all related items from Item model
    Item
        .deleteMany({ listId })
        .then(() => {})
        .catch(catchCallback);
});

// @route           GET api/lists
// @description     GET all lists
// @access          ADMIN
router.get('/all/all', (req, res) => {
    List
        .find()
        .then(lists => res.json(lists))
        .catch(catchCallback);
});

// // @route           GET api/lists
// // @description     GET all lists
// // @access          ADMIN
// router.get('/checkDeletedItems', (req, res) => {
//     List
//         .find()
//         .then(lists => res.json(lists))
//         .catch(catchCallback);
// });

module.exports = router;