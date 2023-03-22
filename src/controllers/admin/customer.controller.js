import * as customerManagement from '../../services/admin/customerManagement.js';

export async function addCustomer(req, res)
{
    try{
        if(req.hasValidationError)
        {
            res.status(403).send("You don't have permission to access this resource");
            return;
        }
        
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
        res.status(200).send({});
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}