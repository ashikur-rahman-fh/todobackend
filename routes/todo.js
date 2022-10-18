var express = require('express');
var router = express.Router();

const Todo = require('../models/todo.model');
const User = require('../models/user.model');

const { validateTodo } = require('../services/todo');
const { authMiddleware } = require('../services/users');

router.get('/', authMiddleware, async (req, res, next) => {
    const { page, page_size } = req.query;
    if (!req.user) {
        return ;
    }

    const options = {
        creator: req.user.id,
    }
    const todos = await Todo.find({ ...options }).select({ title: 1, description: 1, status: 1 }).skip((page - 1) * page_size).limit(page_size);
    const totalCount = await Todo.count({ ...options });

    return res.json({ todos: todos, count: totalCount });
});


router.post('/', validateTodo, authMiddleware, async (req, res, next) => {
    const { title, description } = req.body;
    if (!req.validated) {
        return ;
    }
    if (!req.user) {
        return ;
    }

    let todo;
    try {
        const user = await User.findById(req.user.id);
        console.log(user);
        todo = await Todo.create({ title: title, description: description, creator: user });
        todo.save();
    } catch (error) {
        return res.status(500).send({ message: 'Can not process the request.' });
    }
    
    return res.json(todo);
});

router.get('/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    if (!req.user) {
        return ;
    }

    const option = {
        creator: req.user.id,
        _id: id,
    };

    const todo = await Todo.findOne({ ...option }).select({ title: 1, description: 1});
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found!' });
    }

    return res.json(todo);
});

router.patch('/:id', validateTodo, authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!req.validated) {
        return ;
    }
    if (!req.user) {
        return ;
    }

    const option = {
        creator: req.user.id,
        _id: id,
    };

    const todo = await Todo.findOne({ ...option });
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

router.delete('/:id', authMiddleware, async (req, res, next) => {
    const { id } = req.params;

    if (!req.user) {
        return ;
    }

    const option = {
        creator: req.user.id,
        _id: id,
    };

    const todo = await Todo.findOne({ ...option } );
    if (todo === null) {
        return res.status(404).json({ message: 'Todo not found!' });
    }

    todo.delete();

    return res.status(200).json({ message: "One todos deleted." });
});

module.exports = router;
