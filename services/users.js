const bcrypt = require('bcrypt');

const generateHashedPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainPassword, salt);

    return password;
};

const authenticateUser = async (hashedPassword, plainPassword) => {
    const authenticated = await bcrypt.compare(plainPassword, hashedPassword);

    return authenticated;
};

module.exports = { generateHashedPassword, authenticateUser };
