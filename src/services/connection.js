const { MongoClient } = require("mongodb");
const {env} = require("../config.js");

const url = `mongodb+srv://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@cluster0.7oyas8f.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url);

async function connect()
{
    try
    {
        console.log('Connecting...');
        await client.connect();
        console.log('Connected!');
    }
    catch(e)
    {
        console.log(e.message);
    }
}

module.exports = {
    client,
    connect,
}