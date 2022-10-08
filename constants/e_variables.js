const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_CONFIG = {
    DATABASE: process.env.DB_DATABASE,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    MODE: process.env.DB_MODE,
};


module.exports = { PORT, DATABASE_CONFIG };