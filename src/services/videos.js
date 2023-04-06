const { ObjectId } = require("mongodb");
const { getVideoCollection } = require("./databases.js");

async function addVideo(payload)
{
    const result = await getVideoCollection().insertOne(payload);
    return result.insertedId;
}

async function getVideos()
{
    const cursor = getVideoCollection().find();
    const videos = [];
    await cursor.forEach(video => videos.push(video));
    return videos;
}

async function getVideo(videoId)
{
    return await getVideoCollection().findOne({_id: new ObjectId(videoId)});
}

async function updateVideo(videoId, payload)
{
    const result = await getVideoCollection().updateOne(
        { _id: new ObjectId(videoId) },
        {
            $set: { ...payload },
        },
        {
            upsert: true
        }
    );
    return result.modifiedCount === 1;
}

async function deleteVideo(videoId)
{
    const result = await getVideoCollection().deleteOne({_id: new ObjectId(videoId)});
    return result.deletedCount === 1;
}

function parseVideos(videos, rents)
{
    return videos.map(video => {
        let rentChanges = {
            isRenting: false,
            dueDate: null,
        };
        const videoId = video._id.toString();

        const rent = rents.find(rent => rent.videoId === videoId);
        if(rent)
        {
            rentChanges.isRenting = true;
            rentChanges.dueDate = rent.dueDate
        }

        return {
            ...video,
            ...rentChanges,
        }
    });
}

module.exports = {
    addVideo,
    getVideo,
    getVideos,
    updateVideo,
    deleteVideo,
    parseVideos,
}