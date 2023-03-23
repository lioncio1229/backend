import {getBlacklistedTokenCollection} from '../../database/databases.js';

export async function blacklistToken(accessToken)
{
    await getBlacklistedTokenCollection().insertOne({accessToken});
};

export async function isTokenBlacklisted(accessToken)
{
    const result = await getBlacklistedTokenCollection().findOne({accessToken});
    return result ? true : false;
}