const { getRentCollection } = require("./databases");
const { ObjectId } = require("mongodb");
const { addTime } = require("../helpers/dateAndTime.js");
const { getMovie, updateMovie } = require('./movies.js');

async function getRents(username=null)
{
    const cursor = getRentCollection().find(username ? {username} : {});
    const arr = [];
    await cursor.forEach(item => arr.push(item));
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
                expiresAt: addTime(movie.rentalExpiration).toLocaleString(),
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

module.exports = {
    getRentWithUsernameAndMovieId,
    getRent,
    getRents,
    addRent,
    deleteRent,
};