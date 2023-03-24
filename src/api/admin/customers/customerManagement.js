import { getCustomerCollections } from "../../../database/databases.js";


export async function addCustomer(payload)
{
    await getCustomerCollections().insertOne({
        username: payload.username,
        password: payload.password,
    });
}

export async function getCustomers()
{
    const cursor = getCustomerCollections().find();
    const customers = [];
    await cursor.forEach(customer => customers.push(customer));
    return customers;
}

export async function isCustomerExist(username)
{
    const customers = await getCustomers();
    return customers.find(c => c.username === username) ? true : false;
}

export async function getCustomer(username)
{
    return await getCustomerCollections().findOne({username});
}

export async function updateCustomer(username, payload)
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

export async function deleteCustomer(username)
{
    const result = await getCustomerCollections().deleteOne({username});
    return result.deletedCount === 1;
}