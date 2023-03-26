const { getVideos, parseVideos } = require("../../../services/videos.js");
const rents = require("../../../services/rents.js");
const rentRequests = require('../../../services/rentRequests.js');

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

async function requestRent(req, res)
{
    try{
        const { videoId } = req.body;
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
    getRents,
    requestRent,
}

