const dotenv = require('dotenv');
dotenv.config();

const {MongoClient} = require('mongodb');

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialied.');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db has not been initialized. Please call initDb first.');
    }
    return _db;         
};

module.exports = {
    initDb,
    getDb,
};