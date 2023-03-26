const videos = require("../../../services/videos.js");
const rents = require("../../../services/rents.js");
const rentRequests = require('../../../services/rentRequests.js');

async function getVideos(req, res)
{
    try{
        const videoList = await videos.getVideos();
        const rentList = await rents.getRents(req.username);
        const parsedVideos = videos.parseVideos(videoList, rentList);
        res.status(200).send(parsedVideos);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function requestRent(req, res)
{
    try{
        const { videoId } = req.params;
        if(!videoId) throw new Error('Required Video Id');

        const result = await rentRequests.addRentRequest(req.username, videoId);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    getVideos,
    requestRent,
}

