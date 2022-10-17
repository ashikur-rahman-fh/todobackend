const { MIN_DESCRIPTION_LENGTH } = require('./constants');

const validateTodo = (req, res, next) => {
    const { title, description } = req.body;
    let message = "";

    if (!description) {
        message = `Description can not be empty.`;
    } else if (typeof(description) !== 'string') {
        message = `Description must be a string.`
    } else if (description.length < 5) {
        message = `Description must have ${MIN_DESCRIPTION_LENGTH} characters.`
    }

    if (message) {
        req.validated = false;
    } else {
        req.validated = true;
    }

    next();

    if (!req.validated) {
        return res.json({ message });
    }
}

module.exports = { validateTodo };
