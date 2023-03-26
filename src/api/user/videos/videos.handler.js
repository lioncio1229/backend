const videos = require("../../../services/videos.js");
const rents = require("../../../services/rents.js");

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

module.exports = {
    getVideos,
}

