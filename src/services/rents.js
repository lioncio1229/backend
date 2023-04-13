const { getRentCollection } = require("./databases");
const { ObjectId } = require("mongodb");
const { addTime } = require("../helpers/dateAndTime.js");
const { getMovie, updateMovie } = require('./movies.js');

async function getRents(username=null)
{
    const cursor = getRentCollection().find(username ? {username} : {});
    let arr = [], expiredIds = [], cDate = new Date();
    await cursor.forEach(item => {
        arr.push(item);
        if(cDate > new Date(item.expiresAt))
            expiredIds.push(item._id);
    });

    if(expiredIds.length > 0)
    {
        await getRentCollection().deleteMany({
            $or: expiredIds.map(_id => ({ _id }))
        });
        arr = arr.filter(v => expiredIds.includes(v._id));
    }

    return arr;
}

async function getRentWithUsernameAndMovieId(username, movieId)
{
  return await getRentCollection().findOne({username, movieId});
}

async function getRent(rentId)
{
    return await getRentCollection().findOne({_id: new ObjectId(rentId)});
}

async function addRent(payload)
{
    const movie = await getMovie(payload.movieId);

    const result = await getRentCollection().updateOne(
        { username: payload.username, movieId: payload.movieId },
        {
            $setOnInsert: {
                ...payload,
                expiresAt: addTime(movie.rentalExpiration),
            },
        },
        { upsert: true }
    );

    await updateMovie(payload.movieId, {quantity: movie.quantity - 1});
    return result.upsertedId;
}

async function deleteRent(rentId)
{
    const rent = await getRent(rentId);
    const movie = await getMovie(rent.movieId);
    
    const result = await getRentCollection().deleteOne({_id: new ObjectId(rentId)});

    await updateMovie(movie._id, {quantity: movie.quantity + 1});
    return result?.deletedCount === 1;
}

async function rentRemainingTime(rentId)
{
    const rent = await getRent(rentId);
    if(!rent) return 0;

    let rTime = (new Date(rent.expiresAt) - new Date()) / 1000;
    
    if(rTime <= 0)
    {
        await getRentCollection().deleteOne({_id: new ObjectId(rentId)});
        return 0;
    }
    return rTime;
}

module.exports = {
    getRentWithUsernameAndMovieId,
    getRent,
    getRents,
    addRent,
    deleteRent,
    rentRemainingTime,
};