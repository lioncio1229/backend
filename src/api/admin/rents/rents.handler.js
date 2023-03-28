const rents = require('../../../services/rents.js');
const videos = require('../../../services/videos.js');
const rentsRecords = require('../../../services/rentsRecords.js');

async function getRents(req, res)
{
    try{
        const { style } = req.query;
        let records = await rents.getRents();

        if(style === 'byVideo')
        {
            const videList = await videos.getVideos();
            records = rentsRecords.getRecords(videList, records);
        }

        res.status(200).send(records);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    getRents,
}