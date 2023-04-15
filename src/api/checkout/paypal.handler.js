
async function createOrder(req, res)
{
    try{
        res.send('Test!')
     }
     catch(e)
     {
         res.status(500).send(e.message);
     }
}

module.exports = {
    createOrder,
}