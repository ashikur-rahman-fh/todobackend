const { sequelize, Sequelize } = require('../services/db')

const sync_db = async () => {
    await sequelize.sync({ alter: true });
};

module.exports = sync_db;
