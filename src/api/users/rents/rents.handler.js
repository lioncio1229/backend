const rents = require("../../../services/rents.js");
const rentRequests = require('../../../services/rentRequests.js');

async function addRent(req, res)
{
    try{
        const { videoId } = req.body;
        if(!videoId) throw new Error('Required Video Id');

        const rent = await rents.getRentWithUsernameAndVideoId(req.username, videoId);
        console.log('rent: ',rent);
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

async function getRents(req, res)
{
    try{
        const result = await rents.getRents(req.username);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    getRents,
    addRent,
}