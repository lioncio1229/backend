const { addRentRequest } = require('../../../services/rentRequests.js');


async function requestRent(req, res)
{
    try{
        const { videoId } = req.body;
        if(!videoId) throw new Error('Required Video Id');

        const result = await addRentRequest(req.username, videoId);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    requestRent
}