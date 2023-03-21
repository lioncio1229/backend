import { client } from "./connection.js";

export const getAdminCollections = () => {
    try
    {
        return client.db('database').collection('admins');
    }
    catch(e) 
    {
        console.log(e.message);
    }
};

const getAdmins = async () => {
    
    const cursor = getAdminCollections().find();
    const admins = [];
    await cursor.forEach(admin => admins.push(admin));
    return admins;
}

const addAdmin = async (admin) => {
    await getAdminCollections().insertOne(admin);
    return admin;
}

export {getAdmins, addAdmin};