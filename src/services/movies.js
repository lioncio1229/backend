const { ObjectId } = require("mongodb");
const { getMovieCollection } = require("./databases.js");

async function addMovie(payload)
{
    const result = await getMovieCollection().insertOne(payload);
    return result.insertedId;
}

async function getMovies()
{
    const cursor = getMovieCollection().find();
    const movies = [];
    await cursor.forEach(movie => movies.push(movie));
    return movies;
}

async function getMovie(movieId)
{
    return await getMovieCollection().findOne({_id: new ObjectId(movieId)});
}

async function updateMovie(movieId, payload)
{
    const result = await getMovieCollection().updateOne(
        { _id: new ObjectId(movieId) },
        {
            $set: { ...payload },
        },
        {
            upsert: true
        }
    );
    return result.modifiedCount === 1;
}

async function deleteMovie(movieId)
{
    const result = await getMovieCollection().deleteOne({_id: new ObjectId(movieId)});
    return result.deletedCount === 1;
}

function parseMovies(movies, rents)
{
    return movies.map(movie => {
        let rentChanges = {
            isRenting: false,
            dueDate: null,
        };
        const movieId = movie._id.toString();

        const rent = rents.find(rent => rent.movieId === movieId);
        if(rent)
        {
            rentChanges.isRenting = true;
            rentChanges.dueDate = rent.dueDate
        }

        return {
            ...movie,
            ...rentChanges,
        }
    });
}

module.exports = {
    addMovie,
    getMovie,
    getMovies,
    updateMovie,
    deleteMovie,
    parseMovies,
}