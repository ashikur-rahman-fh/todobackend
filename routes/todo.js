var express = require('express');
var router = express.Router();

const Todo = require('../models/todo.model');
const User = require('../models/user.model');

const { validateTodo } = require('../services/todo');

router.get('/', async (req, res, next) => {
    const { page, page_size } = req.query;

    const todos = await Todo.find().select({ title: 1, description: 1, status: 1 }).skip((page - 1) * page_size).limit(page_size);
    const totalCount = await Todo.count();

    return res.json({ todos: todos, count: totalCount });
});


router.post('/', validateTodo, async (req, res, next) => {
    const { title, description } = req.body;
    if (!req.validated) {
        return ;
    }

    let todo;
    try {
        const user = await User.findById('634e8b19151e22bf259c2d1f');
        todo = await Todo.create({ title: title, description: description, creator: user });
        todo.save();
    } catch (error) {
        return res.status(500).send({ message: 'Can not process the request.' });
    }
    
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

router.patch('/:id', validateTodo, async (req, res, next) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!req.validated) {
        return ;
    }

    const todo = await Todo.findOne({ _id: id });
    if (todo === null) {
        return res.status(404).json({ message: 'Todo not found!' });
    }

    todo.description = description;
    if (title) {
        todo.title = title;
    }
    if (status) {
        todo.status = status;
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
