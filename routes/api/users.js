const express = require('express');

const router = express.Router();

// User model
const User = require('../../models/Users');

// @ route      GET api/users
// @ desc       GET user with the specified email
// @ access     Public

router.get('/:email', (req, res) => {
    User
        .find()
        .then(users => users.filter(user => user.email === req.params.email))
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

// @ route      POST api/users
// @ desc       POST new user
// @ access     Public

router.post('/', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

module.exports = router;