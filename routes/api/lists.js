const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User'); // User Model
const List = require('../../models/List'); // List Model
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
    List
        .findById(req.params.listId)
        .populate('items')
        .then(list => res.json(list))
        .catch(catchCallback);
});

// @route           POST api/lists
// @description     Create a list
// @access          Private
router.post('/', auth, (req, res) => {
    // Creating ID for the list
    const listId = new mongoose.Types.ObjectId();
    
    // Saving the list in List model
    const newList = new List({
        _id: listId,
        userId: req.user.id,
        name: req.body.name,
        totalBudget: req.body.totalBudget,
    });
    newList
        .save()
        .then(list => res.json(list))
        .catch(catchCallback);

    // Saving the list ID in User model
    User
        .findOneAndUpdate(
            { userId: req.body.userId },
            { $push: { lists: listId } }
        )
        .catch(catchCallback);
});

// @route           DELETE api/lists/:id
// @description     Delete a list
// @access          Private
router.delete('/:listId', auth, (req, res) => {
    console.log('deleting...');
    // Removing the list from List model
    List
        .findById(req.params.listId)
        .then(list => list
            .remove()
            .then(() => res.json({ id: req.params.listId })))
        .catch(catchCallback);

    // Removing the list ID from User model
    List
        .findOneAndUpdate(
            { userId: req.body.userId },
            { $pull: { lists: req.params.listId } }
        )
        .catch(catchCallback);
});

// // @route           GET api/lists
// // @description     GET all lists
// // @access          ADMIN
// router.get('/all/all', (req, res) => {
//     List
//         .find()
//         .then(lists => res.json(lists))
//         .catch(catchCallback);
// });

module.exports = router;