var express = require('express');
var router = express.Router();

const Todo = require('../models/todo.model');

router.get('/', async (req, res, next) => {
    const todos = await Todo.find().select({ title: 1, description: 1 });

    return res.json({ todos: todos });
});

router.post('/', async (req, res, next) => {
    const { title, description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'Description can not be empty' });
    } else if (typeof(description) !== 'string') {
        return res.status(400).json( { message: 'Description must be a string.', });
    } else if (description.length < 5) {
        return res.status(400).json({ message: 'Description must have 5 characters.' });
    }

    const todo = await new Todo({ title: title, description: description });
    todo.save();
    
    return res.json(todo);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id }).select({ title: 1, description: 1});
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found!' });
    }

    return res.json(todo);
});

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'Description can not be empty' });
    } else if (typeof(description) !== 'string') {
        return res.status(400).json( { message: 'Description must be a string.', });
    } else if (description.length < 5) {
        return res.status(400).json({ message: 'Description must have 5 characters.' });
    }

    const todo = await Todo.findOne({ _id: id });
    if (todo === null) {
        return res.status(404).json({ message: 'Todo not found!' });
    }

    todo.description = description;
    if (title) {
        todo.title = title;
    }
    todo.save();

    return res.json(todo);
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id } );
    if (todo === null) {
        return res.status(404).json({ message: 'Todo not found!' });
    }

    todo.delete();

    return res.status(200).json({ message: "One todos deleted." });
});

module.exports = router;
