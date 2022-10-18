const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_TOKENS } = require('../constants/e_variables');

const generateHashedPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainPassword, salt);

    return password;
};

const authenticateUser = async (hashedPassword, plainPassword) => {
    const authenticated = await bcrypt.compare(plainPassword, hashedPassword);

    return authenticated;
};

const authMiddleware = async (req, res, next) => {
    const authToken = req.headers['auth-token'];
    
    let user = null;
    try {
        user = await jwt.verify(authToken, JWT_TOKENS.SECRET);
    } catch(error) {
        req.user = null;
        return res.status(400).json({ message: 'Bad requres! Please log in first.'} );
    }
    if (!user) {
        req.user = null;
        return res.status(500).json({ message: 'Can not process the request. '} );
    }

    req.user = user;
    next();
};

module.exports = { generateHashedPassword, authenticateUser, authMiddleware };
