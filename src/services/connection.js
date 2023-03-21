import { MongoClient } from "mongodb";
import {env} from "../config.js";

const url = `mongodb+srv://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@cluster0.7oyas8f.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(url);

export default async function connect()
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