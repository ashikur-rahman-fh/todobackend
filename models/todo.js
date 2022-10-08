const { sequelize, Sequelize } = require('../services/db');

const Todo = sequelize.define('Todo', {
    title: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'untitled',
    },
    description: Sequelize.DataTypes.STRING(512),
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    underscored: true,
    tableName: 'todo',
});

module.exports = Todo;