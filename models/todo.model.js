const { Schema, connection } = require('../services/db');

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
        }
    },
    {
        timestamps: true,
    }
)

const Todo = connection.model('Todo', todoSchema);

module.exports = Todo;
