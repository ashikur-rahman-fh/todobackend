const mongoose = require('mongoose');
const { Schema, connection } = require('../services/db');
const User = require('./user.model');

const todoSchema = new Schema(
    {
        title: {
            type: String,
            default: 'untitled'
        },
        description: {
            type: String,
            required: true,
            minlength: 5,
        },
        status: {
            type: String,
            default: 'pending',
        },
        creator: {
            type: mongoose.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Todo = connection.model('Todo', todoSchema);

module.exports = Todo;
