const { getPaymentTokenCollection } = require('./databases.js');


async function storeAccessToken(paymentName, accessToken)
{
    const result = await getPaymentTokenCollection().updateOne(
        { paymentName },
        { $set: { accessToken } },
        { upsert: true }
    );

    return result.acknowledged;
}

async function getAccessToken(paymentName)
{
    const result = await getPaymentTokenCollection().findOne({paymentName});
    return result;
}


module.exports = {
    storeAccessToken,
    getAccessToken,
}