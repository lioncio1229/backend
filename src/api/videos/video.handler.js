import * as videos from "./videos.js";


export async function addVideo(req, res)
{
    try{
        const videoId = await videos.addVideo(req.body);
        console.log('videoId: ', videoId);
        res.status(200).send(videoId);
    }
    catch(e)
    {
        res.status(500).send(res.message);
    }
}

export default {addVideo};