const express = require('express');
let router = express.Router();

const User = require('../models/user.model');

router.get('/', async(req, res, next) => {
    let users = null;
    try {
        users = await User.find().select({ username: 1, email: 1 });
    } catch(erorr) {
        res.status(500).json({ message: 'Can not process your request.' });
    }

    return res.json({ users: users });
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    let user = null;
    try {
        user = await User.findById(id).select({ username: 1, email: 1 });
    } catch (error) {
        return res.status(400).json({ message: 'Can not find user.'} );
    }

    if (!user) {
        return res.status(400).json({ message: 'Can not find user.'} );
    }

    return res.json({ user: user });
});

module.exports = router;
