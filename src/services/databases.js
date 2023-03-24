const { client } =  require("./connection.js");

function getCollectionAtDatabase(collectionName)
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

function getAdminCollections()
{
    return getCollectionAtDatabase('admins');
}

function getBlacklistedTokenCollection()
{
    return getCollectionAtDatabase('blacklisted_tokens');
}

function getCustomerCollections()
{
    return getCollectionAtDatabase('customers');
}

function getVideoCollection()
{
    return getCollectionAtDatabase('videos');
}

function getRentCollection()
{
    return getCollectionAtDatabase('rents');
}

module.exports = {
    getCollectionAtDatabase,
    getAdminCollections,
    getBlacklistedTokenCollection,
    getCustomerCollections,
    getVideoCollection,
    getRentCollection,
}