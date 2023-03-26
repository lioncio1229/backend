const { getRentCollection } = require("./databases");
const { ObjectId } = require("mongodb");
const { addDaytoCurrentTime } = require("../helpers/dateAndTime.js");

async function getRents(username)
{
    const cursor = getRentCollection().find({ username });
    const arr = [];
    await cursor.forEach(item => arr.push(item));
    return arr;
}

async function getRent(username, videoId)
{
  return await getRentCollection().findOne({username, videoId});
}

async function addRent(username, videoId, rentDurationInDays=3)
{
  const result = await getRentCollection().updateOne(
      { username, videoId },
      {
          $setOnInsert : { username, videoId, dueDate: addDaytoCurrentTime(rentDurationInDays)}
      },
      {upsert: true}
  );
  return result.upsertedId;
}

async function removeRent(rentId)
{
    const result = await getRentCollection().deleteOne({_id: new ObjectId(rentId)});
    return result.deletedCount === 1;
}

module.exports = {
    getRent,
    getRents,
    addRent,
    removeRent,
};