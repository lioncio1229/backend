const videos = require("../../services/videos.js");


async function addVideo(req, res)
{
    try{
        const videoId = await videos.addVideo(req.body);
        res.status(200).send(videoId);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getVideo(req, res)
{
    try{
        const {videoId} = req.params;
        const video = await videos.getVideo(videoId);
        res.status(200).send(video);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getVideos(req, res)
{
    try{
        const videoList = await videos.getVideos();
        res.status(200).send(videoList);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function updateVideo(req, res)
{
    try{
        const {videoId} = req.params;
        const {title, description, category, price, rentingDuration} = req.body;
        
        if(!videoId)
        {
            throw new Error('Please add videoId parameter');
        }

        const payload = {};

        if(title) payload.title = title;
        if(description) payload.description = description;
        if(category) payload.category = category;
        if(price) payload.price = price;
        if(rentingDuration) payload.rentingDuration = rentingDuration;

        const isUpdated = await videos.updateVideo(videoId, payload);
        res.status(200).send(isUpdated);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function deleteVideo(req, res)
{
    try{
        const {videoId} = req.params;
        const isDeleted = await videos.deleteVideo(videoId);
        res.status(200).send(isDeleted);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}


module.exports = { addVideo, getVideo, getVideos, updateVideo, deleteVideo };