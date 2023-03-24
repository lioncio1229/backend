const { getCustomerCollections } = require("./databases.js");


async function addCustomer(payload)
{
    await getCustomerCollections().insertOne({
        username: payload.username,
        password: payload.password,
    });
}

async function getCustomers()
{
    const cursor = getCustomerCollections().find();
    const customers = [];
    await cursor.forEach(customer => customers.push(customer));
    return customers;
}

async function isCustomerExist(username)
{
    const customers = await getCustomers();
    return customers.find(c => c.username === username) ? true : false;
}

async function getCustomer(username)
{
    return await getCustomerCollections().findOne({username});
}

async function updateCustomer(username, payload)
{
    await getCustomerCollections().updateOne(
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

async function deleteCustomer(username)
{
    const result = await getCustomerCollections().deleteOne({username});
    return result.deletedCount === 1;
}

module.exports = {
  addCustomer,
  getCustomer,
  getCustomers,
  isCustomerExist,
  updateCustomer,
}