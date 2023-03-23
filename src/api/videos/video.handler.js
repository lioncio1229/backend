import * as videos from "./videos.js";


export async function addVideo(req, res)
{
    try{
        const videoId = await videos.addVideo(req.query);
        res.status(200).send(videoId);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export default {addVideo};