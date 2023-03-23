import { getAdminCollections } from "../../database/databases.js";

export async function getAdmins()
{
    const cursor = getAdminCollections().find();
    const admins = [];
    await cursor.forEach(admin => admins.push(admin));
    return admins;
}

export async function getAdmin(username)
{
    return await getAdminCollections().findOne({username});
}

export async function addAdmin(admin)
{
    await getAdminCollections().insertOne(admin);
    return admin;
}