const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_CONFIG = {
    DATABASE: process.env.DB_DATABASE,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    MODE: process.env.DB_MODE,
    NAME: process.env.DB_NAME,
};

const JWT_TOKENS = {
    SECRET: process.env.JWT_SECRET_TOKEN,
    REFRESH: process.env.JWT_REFRESH_TOKEN,
}

module.exports = { PORT, DATABASE_CONFIG, JWT_TOKENS };
