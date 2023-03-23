import * as customerManagement from './customerManagement.js';

export async function addCustomer(req, res)
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

export async function getCustomers(req, res)
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