const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User Model
const User = require('../../models/User');

// @route           POST api/users
// @description     Register new user
// @access          Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: 'Please, fill out all fields' });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;

                    newUser.save().then(user => {
                        jwt.sign(
                            { id: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: 1800 },
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        );
                    });
                });
            })
        })
        .catch(err => console.log(err));
});

// @route           GET api/users
// @description     GET All Users
// @access          Admin
router.get('/', (req, res) => {
    User
        .find()
        .sort({ date: 1 })
        .then(users => res.json(users))
});

// @route           DELETE api/users/:id
// @description     Delete An Item
// @access          Public
router.delete('/:id', (req, res) => {
    Item
        .findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ id: req.params.id })))
        .catch(e => res.status(404).json({success: false}));
});

module.exports = router;