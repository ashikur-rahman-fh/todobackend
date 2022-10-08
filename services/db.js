const os = require('os');
var Sequelize = require('sequelize');

const { DATABASE_CONFIG } = require('../constants/e_variables');

const REMOTE_DB_SETTINGS = {
    ...(DATABASE_CONFIG.MODE == 'remote' && {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
         },   
    })
}

var sequelize = new Sequelize(DATABASE_CONFIG.DATABASE, DATABASE_CONFIG.USERNAME, DATABASE_CONFIG.PASSWORD, {
    host: DATABASE_CONFIG.HOST,
    dialect: 'postgres',
    ...REMOTE_DB_SETTINGS,
    logging: null,
    port: DATABASE_CONFIG.PORT,
    pool: {
        max: parseInt(
            120 /  os.cpus().length,
        ),
        min: 2,
        idle: 10000,
        acquire: 20000,
    },
    retry: {
        match:
            'SequelizeDatabaseError: could not serialize access due to concurrent update',
        max: 3,
    },
});

const test_db_connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    Sequelize,
    sequelize,
    test_db_connection,
};
