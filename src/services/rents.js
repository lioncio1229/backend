const { getRentCollection } = require("./databases");

async function getRents(username)
{
    const result = await getRentCollection().findOne({ username });
    return result?.list || [];
}

async function addRent(username, videoId)
{
    const result = await getRentCollection().updateOne(
        { username },
        { $push: { list: videoId } },
        { upsert: true }
    );
    return result.modifiedCount === 1;
}

async function removeRent(username, videoId)
{
    const result = await getRentCollection().updateOne(
        { username },
        { $pull: { list: videoId } },
        { upsert: true }
    );

    //remove entire user object if there have no rent list
    if(result.modifiedCount === 1)
    {
        const rentList = await getRents(username);
        if(rentList.length === 0)
        {
            await getRentCollection().deleteOne({username});
        }
        return true;
    }

    return false;
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
            if(rentId === video._id)
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
    getRents,
    addRent,
    removeRent,
    parseVideos,
};