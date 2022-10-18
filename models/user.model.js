const { Schema, connection } = require('../services/db');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
)

const User = connection.model('User', userSchema);

module.exports = User;
