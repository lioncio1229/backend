const { getBlacklistedTokenCollection } = require('./databases.js');

async function blacklistToken(accessToken)
{
    await getBlacklistedTokenCollection().insertOne({accessToken});
};

async function isTokenBlacklisted(accessToken)
{
    const result = await getBlacklistedTokenCollection().findOne({accessToken});
    return result ? true : false;
}

module.exports = { blacklistToken, isTokenBlacklisted };