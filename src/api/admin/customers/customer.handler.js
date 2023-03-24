const customerManagement = require('../../../services/customers.js');

async function addCustomer(req, res)
{
    try{
        const {username, password} = req.body;
        if(!username || !password)
        {
            throw new Error('Username and Password required');
        }

        const isExist = await customerManagement.isCustomerExist(username);
        if(isExist)
        {
            res.status(200).send('Customer Exist');
            return;
        }
        await customerManagement.addCustomer({username, password});
        res.status(200).send(username);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getCustomers(req, res)
{
    try{
        const customers = await customerManagement.getCustomers();
        const parsedCustomers = customers.map(customer => customer.username);
        res.status(200).send(parsedCustomers);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function updateCustomer(req, res)
{
    try{
        const {username, password} = req.body;
        await customerManagement.updateCustomer(req.params.username, {username, password});
        res.status(200).send(username);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function deleteCustomer(req, res)
{
    try{
        const {username} = req.params;
        await customerManagement.deleteCustomer(username);
        res.status(200).send(username);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    addCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
}