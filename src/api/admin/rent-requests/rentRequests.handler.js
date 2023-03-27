const rentRequests = require('../../../services/rentRequests.js');
const rents = require('../../../services/rents.js');

async function acceptRentRequest(req, res)
{
    try{
        const { rentRequestId } = req.params;
        const rent = await rentRequests.getRentRequest(rentRequestId);
        if(!rent) {
            res.status(404).send("Rent not found");
            return;
        }

        const result = await rents.addRent(rent);
        await rentRequests.deleteRentRequest(rentRequestId);
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
    acceptRentRequest,
    getAllRentRequest,
    deleteRentRequest,
}