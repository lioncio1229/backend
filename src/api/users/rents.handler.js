const rents = require("../../services/rents.js");

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
}