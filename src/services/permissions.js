const { getUserCollections } = require('./databases.js');


async function getPermissions(username)
{
    const user = await getUserCollections().findOne({username});
    return user?.permissions;
}

async function getPermission(username, name)
{
    const permissions = await getPermissions(username);
    return permissions.find(v => v.name === name);
}

async function addPermission(username, name, actions)
{
    const result = await getUserCollections().updateOne({username}, {$push : {'permissions': {name, actions}}});
    return result.modifiedCount === 1;
}

async function deletePermission(username, name)
{
    const result = await getUserCollections().updateOne({username}, {$pull: {'permissions': {name}}});
    return result.modifiedCount === 1;
}

async function addAction(username, name, newAction)
{
    const result = await getUserCollections().updateOne({username, 'permissions.name': name}, {$push: {'permissions.$.actions': newAction}});
    return result.modifiedCount === 1;
}

async function getActions(username, name)
{
    const permissions = await getPermissions(username);
    return permissions.find(v => v.name === name)?.actions;
}

async function deleteAction(username, name, actionName)
{
    const result = await getUserCollections().updateOne({username, 'permissions.name': name}, {$pull: {'permissions.$.actions': actionName}});
    return result.modifiedCount === 1;
}

module.exports = {
    getPermission,
    getPermissions,
    addPermission,
    deletePermission,
    addAction,
    getActions,
    deleteAction,
}