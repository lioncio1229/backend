const permissions = require('../../services/permissions.js');


async function getPermissions(req, res)
{
    try{
        const {name} = req.params;

        let result;
        if(name) result = await permissions.getPermission(req.username, name);
        else result = await permissions.getPermissions(req.username);

        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function addPermission(req, res)
{
    try{
        const {name, actions} = req.body;
        const result = await permissions.addPermission(req.username, name, actions);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function deletePermission(req, res)
{
    try{
        const result = await permissions.deletePermission(req.username, req.params.name);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function addAction(req, res)
{
    try{
        const { actionName } = req.query;
        if(!actionName) throw new Error('actionName field required');
        const result = await permissions.addAction(req.username, req.params.name, actionName);
        res.status(200).send(result);        
    }
    catch(e)
    {
        res.send(500).send(e.message);
    }
}

async function getActions(req, res)
{
    try{
        const { name } = req.params;
        const result = await permissions.getActions(req.username, name);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function deleteAction(req, res)
{
    try{
        const { name, actionName } = req.params;
        const result = await permissions.deleteAction(req.username, name, actionName);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    addPermission,
    getPermissions,
    deletePermission,
    addAction,
    getActions,
    deleteAction,
}