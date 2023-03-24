const { getAdminCollections } = require("./databases.js");

async function getAdmins()
{
    const cursor = getAdminCollections().find();
    const admins = [];
    await cursor.forEach(admin => admins.push(admin));
    return admins;
}

async function getAdmin(username)
{
    return await getAdminCollections().findOne({username});
}

async function addAdmin(admin)
{
    await getAdminCollections().insertOne(admin);
    return admin;
}

module.exports = {
    getAdmin,
    getAdmins,
    addAdmin,
}