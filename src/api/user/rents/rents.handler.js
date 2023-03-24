const { getVideos, parseVideos } = require("../../../services/videos.js");
const rents = require("../../../services/rents.js");

async function getRents(req, res)
{
    try{
        const videos = await getVideos();
        const rentList = await rents.getRents(req.username);
        const parsedVideos = parseVideos(videos, rentList);
        res.status(200).send(parsedVideos);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function addRent(req, res)
{
    try{
        const {videoId} = req.body;
        if(!videoId)
        {
            throw new Error('Required Video Id');
        }
        const result = await rents.addRent(req.username, videoId);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    getRents,
    addRent,
}

