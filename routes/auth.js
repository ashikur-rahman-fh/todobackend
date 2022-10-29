const express = require('express');
const jwt = require('jsonwebtoken');

let router = express.Router();

const User = require('../models/user.model');
const { JWT_TOKENS } = require('../constants/e_variables');
const { generateHashedPassword, authenticateUser } = require('../services/users');
const { LOGIN_TIME_OUT_MINUTE } = require('../services/constants');

router.post('/register', async (req, res, next) => {
    const { username, password, email, name } = req.body;
    const hashedPassword = await generateHashedPassword(password);
    let user = null;
    try {
        user = await User.create({ username, password: hashedPassword, email, name });
    } catch (error) {
        return res.status(500).json({ message: 'Can not create user.', error: error.message} );
    }

    return res.status(201).json({
        message: 'A new user created.',
        user: {
            username: user?.username,
            email: user?.email,
            _id: user?._id,
        }
    });
});


router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    let user = null;
    try {
        user = await User.findOne({ username: username });
    } catch(error) {
        return res.status(404).json({ message: 'Can not find user.' });
    }
    if (!user) {
        return res.status(404).json({ message: 'Can not find user.' });
    }

    const authenticated = await authenticateUser(user.password, password);
    if (!authenticated) {
        return res.status(401).json({ message: "Please check your username and password. "});
    }

    const tokenUser = {
        id: user?._id,
        username: user?.username,
        email: user?.email,
        name: user?.name,
    }
    const authToken = await jwt.sign(tokenUser, JWT_TOKENS.SECRET, {expiresIn: `${LOGIN_TIME_OUT_MINUTE}m` });

    return res.json({
        message: 'authenticated',
        token: authToken,
    });
});

router.get("/userinfo", async (req, res, next) => {
    const authToken = req.headers['auth-token'];

    let user = null;
    try {
        user = jwt.verify(authToken, JWT_TOKENS.SECRET);
    } catch (error) {
        return res.status(200).json({ message: "Can not verify token." });
    }

    return res.json({ user: user });
});

module.exports = router;
