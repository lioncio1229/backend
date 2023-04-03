const { getRentCollection } = require("./databases");
const { ObjectId } = require("mongodb");
const { addDaytoCurrentTime } = require("../helpers/dateAndTime.js");
const { getVideo, updateVideo } = require('./videos.js');

async function getRents(username=null)
{
    const cursor = getRentCollection().find(username ? {username} : {});
    const arr = [];
    await cursor.forEach(item => arr.push(item));
    return arr;
}

async function getRentWithUsernameAndVideoId(username, videoId)
{
  return await getRentCollection().findOne({username, videoId});
}

async function getRent(rentId)
{
    return await getRentCollection().findOne({_id: new ObjectId(rentId)});
}

async function addRent(payload)
{
    const video = await getVideo(payload.videoId);

    const result = await getRentCollection().updateOne(
        { username: payload.username, videoId: payload.videoId },
        {
            $setOnInsert: {
                ...payload,
                dueDate: addDaytoCurrentTime(video.rentDurationInDays),
            },
        },
        { upsert: true }
    );

    await updateVideo(payload.videoId, {quantity: video.quantity - 1});
    return result.upsertedId;
}

async function deleteRent(rentId)
{
    const rent = await getRent(rentId);
    const video = await getVideo(rent.videoId);
    
    const result = await getRentCollection().deleteOne({_id: new ObjectId(rentId)});

    await updateVideo(video._id, {quantity: video.quantity + 1});
    return result?.deletedCount === 1;
}

module.exports = {
    getRentWithUsernameAndVideoId,
    getRent,
    getRents,
    addRent,
    deleteRent,
};