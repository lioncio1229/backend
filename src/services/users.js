const { getUserCollections } = require("./databases.js");


async function addUser(payload)
{
    await getUserCollections().insertOne({...payload});
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
    await getUserCollections().updateOne(
      { username },
      {
        $set: {
          username: payload.username,
          password: payload.password,
        },
      },
      {
        upsert: true
      }
    );
}

async function deleteUser(username)
{
    const result = await getUserCollections().deleteOne({username});
    return result.deletedCount === 1;
}

module.exports = {
  addUser,
  getUser,
  getUsers,
  isUserExist,
  updateUser,
  deleteUser,
}