import { client } from "./connection.js";

export function getCollectionAtDatabase(collectionName)
{
    try
    {
        return client.db('database').collection(collectionName);
    }
    catch(e) 
    {
        console.log(e.message);
        throw new Error(e.message);
    }
}

export function getAdminCollections()
{
    return getCollectionAtDatabase('admins');
}

export function getBlacklistedTokenCollection()
{
    return getCollectionAtDatabase('blacklisted_tokens');
}

export function getCustomerCollections()
{
    return getCollectionAtDatabase('customers');
}

export function getVideoCollection()
{
    return getCollectionAtDatabase('videos');
}