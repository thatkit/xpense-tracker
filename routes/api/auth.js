const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const router = express.Router();

// user Model
const User = require('../../models/User');

// @route           POST api/auth
// @description     Auth new user
// @access          Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Please, fill out all fields' });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ message: 'User doesn\'t exist' });

            bcrypt.compare(password, user.password).then(isMatch => {
                !isMatch && res.status(400).json({ message: 'Invalid credentials' });

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
            })
        })
        .catch(err => console.log(err));
});

// @route           GET api/auth/user
// @description     GET user data
// @access          Private
router.get('/user', auth, (req, res) => {
    User
        .findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;