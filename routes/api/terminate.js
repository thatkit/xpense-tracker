const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // User Model
const List = require('../../models/List'); // List Model
const Item = require('../../models/Item'); // Item Model
const catchCallback = require('../../helpers/errorHandling');

// @route           DELETE api/terminate
// @description     TERMINATE ALL DATA FROM DB
// @access          ADMIN
router.delete('/', (req, res) => {
    [User, List, Item].forEach(Model => {
        Model
            .deleteMany({})
            .then(() => {})
            // .then(docs => docs.forEach(doc => {
            //     doc.remove().then(() => res.send('All data is terminated')).catch(catchCallback);
            // }))
            .catch(catchCallback);
    });

    res.send('All data is terminated');
});

module.exports = router;