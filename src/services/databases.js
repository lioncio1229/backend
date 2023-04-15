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

function getUserCollections()
{
    return getCollectionAtDatabase('users');
}

function getMovieCollection()
{
    return getCollectionAtDatabase('movies');
}

function getRentCollection()
{
    return getCollectionAtDatabase('rents');
}

function getPaymentTokenCollection()
{
    return getCollectionAtDatabase('paymentTokens');
}

module.exports = {
    getCollectionAtDatabase,
    getAdminCollections,
    getBlacklistedTokenCollection,
    getUserCollections,
    getMovieCollection,
    getRentCollection,
    getPaymentTokenCollection,
}