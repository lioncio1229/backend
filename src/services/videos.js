import { ObjectId } from "mongodb";
import { getVideoCollection } from "./databases.js";

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
    return await getVideoCollection().findOne({_id: new ObjectId(videoId)});
}

export async function updateVideo(videoId, payload)
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

export async function deleteVideo(videoId)
{
    const result = await getVideoCollection().deleteOne({_id: new ObjectId(videoId)});
    return result.deletedCount === 1;
}