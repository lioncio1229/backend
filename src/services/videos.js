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
            $set: { ...payload, _id: new ObjectId(videoId) },
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
        let changes = {
            isRenting: false
        }
        for(let i = 0; i < rents.length; i++)
        {
            const rentId = rents[i];
            if(rentId === video._id.toString())
            {
                changes = {
                    isRenting: true
                }
                break;
            }
        }

        return {
            ...video,
            ...changes
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