import { client } from "./connection.js";

function getAdminCollections() {
    try
    {
        return client.db('database').collection('admins');
    }
    catch(e) 
    {
        console.log(e.message);
    }
};

function getTokenCollections() {
    try
    {
        return client.db('database').collection('invalid_tokens');
    }
    catch(e) 
    {
        console.log(e.message);
    }
};

export async function getAdmins()
{
    const cursor = getAdminCollections().find();
    const admins = [];
    await cursor.forEach(admin => admins.push(admin));
    return admins;
}

export async function getAdmin(username)
{
    return await getAdminCollections().findOne({username});
}

export async function addAdmin(admin)
{
    await getAdminCollections().insertOne(admin);
    return admin;
}

export async function blacklistToken(accessToken)
{
    await getTokenCollections().insertOne({accessToken});
};

export async function isTokenBlacklisted(accessToken)
{
    const result = await getTokenCollections().findOne({accessToken});
    return result ? true : false;
}