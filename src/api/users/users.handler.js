const users = require('../../services/users.js');

async function addUser(req, res)
{
    try{
        const {username, password} = req.body;
        if(!username || !password)
        {
            throw new Error('Username and Password required');
        }

        const isExist = await users.isUserExist(username);
        if(isExist)
        {
            res.status(200).send('Customer Exist');
            return;
        }
        await users.addUser({username, password});
        res.status(200).send(username);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getUsers(req, res)
{
    try{
        const { username } = req.params;
        let result;
        if(username)
        {
            const user = await users.getUser(username);
            result = {
              username: user.username,
              fullname: user.fullname,
              permissions: user.permissions,
            };
        }
        else{
            const customers = await users.getUsers();
            result = customers.map(customer => customer.username);
        }
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function updateUser(req, res)
{
    try{
        const result = await users.updateUser(req.params.username, req.body);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function deleteUser(req, res)
{
    try{
        const {username} = req.params;
        const result = await users.deleteUser(username);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser
}