const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User'); // User Model
const catchCallback = require('../../helpers/errorHandling');

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
// @access          ADMIN
router.get('/', (req, res) => {
    User
        .findById(req.body.userId)
        .populate('lists')
        .then(users => res.json(users))
        .catch(catchCallback);
});

// @route           GET api/users
// @description     GET All Users
// @access          ADMIN
router.get('/all', (req, res) => {
    User
        .find()
        .then(users => res.json(users))
        .catch(catchCallback);
});

module.exports = router;