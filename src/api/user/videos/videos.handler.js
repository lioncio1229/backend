const { getVideos : getVideosInDb } = require("../../../services/videos.js");
const { getRents, parseVideos } = require("../../../services/rents.js");

async function getVideos(req, res)
{
    try{
        const videos = await getVideosInDb();
        const rents = await getRents(req.username);
        const parsedVideos = parseVideos(videos, rents);
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

