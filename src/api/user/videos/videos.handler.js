const { getVideos : getVideosInDb } = require("../../../services/videos");
const rents = require("../../../services/rents.js");

async function getVideos(req, res)
{
    try{
        const videos = await getVideosInDb();
        const rents = await rents.getRents(req.username);

        
        const parsedVideos = videos.map(video => {
            
        })
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    getVideos,
}

