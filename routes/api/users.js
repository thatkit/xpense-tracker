const express = require('express');

const router = express.Router();

// User model
const User = require('../../models/Users');

// @ route      GET api/users
// @ desc       GET all users
// @ access     Private

router.get('/', (req, res) => {
    User
        .find()
        .then(users => res.json(users))
        .catch(err => console.log(err));
});

// @ route      GET api/users/:email/:password
// @ desc       GET user with the specified email
// @ access     Public

router.get('/:email/:password', (req, res) => {
    User
        .find()
        .then(users => {
            users
                .filter(user => user.email === req.params.email && user.password === req.params.password)
                .length
                // returns this if the users arrays IS NOT empty === if there IS such a user
                ? res.json({
                    message: 'the user already exists',
                    isRegistered: true
                })
                // returns this if the users arrays IS empty === if there IS NO such a user
                : res.json({
                    message: 'the user does not exist',
                    isRegistered: false
                });
        })
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