var express = require('express');
var router = express.Router();
const Todo = require('../models/todo')

router.get('/', async (req, res, next) => {
    const todos = await Todo.findAll();

    return res.json(todos);
});

router.post('/', async (req, res, next) => {
    const { title, desciption } = req.body;

    if (!desciption) {
        return res.status(400).json({ message: 'Desciption can not be empty' });
    }
    if (typeof(desciption) !== 'string') {
        return res.status(400).json( { message: 'Desciption must be a string.', });
    }

    const todo = await Todo.create({ title: title, desciption: desciption });
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
    const { title, desciption } = req.body;

    if (!desciption) {
        return res.status(400).json({ message: 'Desciption can not be empty' });
    }
    if (typeof(desciption) !== 'string') {
        return res.status(400).json( { message: 'Desciption must be a string.', });
    }

    const todo = await Todo.findOne( { where : { id: id} });
    if (todo === null) {
        return res.status(404).json({ message: 'Todo not found!' });
    }

    todo.desciption = desciption;
    if (title) {
        todo.title = title;
    }
    todo.save();

    return res.json(todo);
});

module.exports = router;