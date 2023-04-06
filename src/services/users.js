const { getUserCollections } = require("./databases.js");


async function addUser(payload)
{
    const result = await getUserCollections().insertOne({...payload});
    return result?.insertedId;
}

async function getUsers()
{
    const cursor = getUserCollections().find();
    const customers = [];
    await cursor.forEach(customer => customers.push(customer));
    return customers;
}

async function isUserExist(username)
{
    const customers = await getUsers();
    return customers.find(c => c.username === username) ? true : false;
}

async function getUser(username)
{
    return await getUserCollections().findOne({username});
}

async function updateUser(username, payload)
{
    const result = await getUserCollections().updateOne(
      { username },
      {
        $set: {...payload},
      }
    );
    return result?.modifiedCount === 1;
}

async function deleteUser(username)
{
    const result = await getUserCollections().deleteOne({username});
    return result?.deletedCount === 1;
}

module.exports = {
  addUser,
  getUser,
  getUsers,
  isUserExist,
  updateUser,
  deleteUser,
}