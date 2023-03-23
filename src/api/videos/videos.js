import { ObjectId } from "mongodb";
import { getVideoCollection } from "../../database/databases.js";

export async function addVideo(payload)
{
    const result = await getVideoCollection().insertOne(payload);
    return result.insertedId;
}

export async function getVideos()
{
    const cursor = getVideoCollection().find();
    const videos = [];
    await cursor.forEach(video => videos.push(video));
    return videos;
}

export async function getVideo(videoId)
{
    return await getVideoCollection().findOne({_id: ObjectId(videoId)});
}

export async function updateVideo(videoId, payload)
{
    await getVideoCollection().updateOne(
        { _id: ObjectId(videoId) },
        {
            $set: { ...payload, _id: ObjectId(videoId) },
        },
        {
            upsert: true
        }
    );
    return videoId;
}

export async function deleteVideo(videoId)
{
    const result = await getVideoCollection().deleteOne({_id: ObjectId(videoId)});
    return result.deletedCount === 1;
}