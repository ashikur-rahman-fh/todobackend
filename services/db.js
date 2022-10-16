const mongoose = require('mongoose');
const { DATABASE_CONFIG } = require('../constants/e_variables');

const connectDatabase = async () => {
    const uri = `mongodb+srv://tododb:${DATABASE_CONFIG.PASSWORD}@todo.wj0akci.mongodb.net/?retryWrites=true&w=majority`
    const options = {
        ssl: DATABASE_CONFIG.MODE === 'dev' || DATABASE_CONFIG.MODE === 'prod',
        dbName: DATABASE_CONFIG.NAME || 'wrongdb',
    };
    await mongoose.connect(uri, { ...options });
}

const Schema = mongoose.Schema;

module.exports = { connectDatabase, Schema, connection: mongoose.connection };
