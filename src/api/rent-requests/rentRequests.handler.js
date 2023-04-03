const rentRequests = require('../../services/rentRequests.js');
const rents = require('../../services/rents.js');


async function addRentRequest(req, res)
{
    try{
        const { videoId } = req.query;
        if(!videoId) throw new Error('Required Video Id');

        const rent = await rents.getRentWithUsernameAndVideoId(req.username, videoId);

        if(rent)
        {
            res.status(409).send('Video is currently renting');
            return;
        }
        const result = await rentRequests.addRentRequest(req.username, videoId);
        if(!result)
        {
            res.status(409).send('Video is currently in renting requests');
            return;
        }
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getAllRentRequest(req, res)
{
    try{
        const result = await rentRequests.getAllRentRequest();
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function deleteRentRequest(req, res)
{
    try{
        const { rentRequestId } = req.params;
        const result = await rentRequests.deleteRentRequest(rentRequestId);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    addRentRequest,
    getAllRentRequest,
    deleteRentRequest,
}