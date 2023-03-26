const { getRentRequestCollection } = require('./databases.js');
const { ObjectId } = require('mongodb');

async function addRentRequest(username, videoId)
{
    const result = await getRentRequestCollection().updateOne(
        { username, videoId },
        {
            $setOnInsert : { username, videoId }
        },
        {upsert: true}
    );
    return result.upsertedId;
}

async function getAllRentRequest()
{
    const cursor = getRentRequestCollection().find();
    const arr = [];
    await cursor.forEach(item => arr.push(item));
    return arr;
}

async function deleteRentRequest(rentRequestId)
{
    const result = await getRentRequestCollection().deleteOne({_id: new ObjectId(rentRequestId)});
    return result.deletedCount === 1;
}


module.exports = {
    addRentRequest,
    getAllRentRequest,
    deleteRentRequest,
}

