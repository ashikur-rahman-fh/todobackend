var express = require('express');
var router = express.Router();
const Todo = require('../models/todo')

router.get('/', async (req, res, next) => {
    const todos = await Todo.findAll();

    return res.json(todos);
});

router.post('/', async (req, res, next) => {
    const { title, description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'Description can not be empty' });
    }
    if (typeof(description) !== 'string') {
        return res.status(400).json( { message: 'Description must be a string.', });
    }

    const todo = await Todo.create({ title: title, description: description });
    todo.save();

    return res.json(todo);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    const todo = await Todo.findOne( { where : { id: id} });
    if (todo === null) {
        return res.status(404).json({ message: 'Todo not found!' });
    }

    return res.json(todo);
});

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'Description can not be empty' });
    }
    if (typeof(description) !== 'string') {
        return res.status(400).json( { message: 'Description must be a string.', });
    }

    const todo = await Todo.findOne( { where : { id: id} });
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

module.exports = router;