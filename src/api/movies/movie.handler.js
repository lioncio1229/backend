const movies = require("../../services/movies.js");
const rents = require("../../services/rents.js");

async function addMovie(req, res)
{
    try{
        const movieId = await movies.addMovie(req.body);
        res.status(200).send(movieId);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getMovie(req, res)
{
    try{
        const {movieId} = req.params;
        const movie = await movies.getMovie(movieId);
        res.status(200).send(movie);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getMovies(req, res)
{
    try{
        const movieList = await movies.getMovies();
        res.status(200).send(movieList);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getMoviesByUser(req, res)
{
    try{
        const { username } = req.params;
        if(!username) throw new Error('username parameter required');

        const movieList = await movies.getMovies();
        const rentList = await rents.getRents(username);
        const parsedMovies = movies.parseMovies(movieList, rentList);
        
        res.status(200).send(parsedMovies);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function updateMovie(req, res)
{
    try{
        const {movieId} = req.params;
        const {title, description, category, price, rentingDuration} = req.body;
        
        if(!movieId)
        {
            throw new Error('Please add movieId parameter');
        }

        const payload = {};

        if(title) payload.title = title;
        if(description) payload.description = description;
        if(category) payload.category = category;
        if(price) payload.price = price;
        if(rentingDuration) payload.rentingDuration = rentingDuration;

        const isUpdated = await movies.updateMovie(movieId, payload);
        res.status(200).send(isUpdated);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function deleteMovie(req, res)
{
    try{
        const { movieId } = req.params;
        const isDeleted = await movies.deleteMovie(movieId);
        res.status(200).send(isDeleted);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}


module.exports = {
  addMovie,
  getMovie,
  getMovies,
  getMoviesByUser,
  updateMovie,
  deleteMovie,
};