const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const generateToken = (userId, fullname) => {
    return jwt.sign({ id: userId, fullname }, authConfig.secret, { expiresIn: 86400 })
}

const signUp = async (req, res,) => {
    const username = req.body.username;
    const password = req.body.password;

    const userAlreadyExists = await User.find({
        username,
        password
    });

    if (userAlreadyExists.length === 0) {
        const response = await User.create(req.body);

        res.status(200).json({
            "msg": response
        })
    } else {
        res.status(404).json({
            msg: "user already exist."
        })
    }
};

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await User.findOne({
        username,
        password
    });

    if (response) {
        token = generateToken(response._id, response.fullname);

        res.status(200).json({
            token,
        });
    } else {
        res.status(401).json({
            "msg": "user doenst exist."
        })
    }
}

module.exports = {
    signUp,
    login,
}