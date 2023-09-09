const { MongoClient } = require('mongodb');
const mongodbUrl = "mongodb+srv://kasppr:prat1112@nodejs.om2ie.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongodbUrl);
const connectionResponse = client.connect();
const db = client.db('test');
connectionResponse ? console.log('Successfully Connected to Database') : console.log('Error Connecting to Database');

module.exports = { db, client };