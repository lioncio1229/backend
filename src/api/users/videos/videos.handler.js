const videos = require("../../../services/videos.js");
const rents = require("../../../services/rents.js");
const rentRequests = require('../../../services/rentRequests.js');

async function getVideos(req, res)
{
    try{
        const videoList = await videos.getVideos();
        const rentList = await rents.getRents(req.username);
        const rentRequestList = await rentRequests.getAllRentRequest(req.username);
        const parsedVideos = videos.parseVideos(videoList, rentList, rentRequestList);
        
        res.status(200).send(parsedVideos);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    getVideos,
}

