import { client } from "./connection.js";

function getTokenCollections() {
    try
    {
        return client.db('database').collection('blacklisted_tokens');
    }
    catch(e) 
    {
        console.log(e.message);
    }
};

export async function blacklistToken(accessToken)
{
    await getTokenCollections().insertOne({accessToken});
};

export async function isTokenBlacklisted(accessToken)
{
    const result = await getTokenCollections().findOne({accessToken});
    return result ? true : false;
}