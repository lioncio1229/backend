const movies = require("../../services/movies.js");
const rents = require("../../services/rents.js");
const {uploadObjectWithId, updateObject, getImageUrl, getVideoUrl} = require('../../minio-client.js');


function parseBody({title, description, price, rentingDuration})
{
    const payload = {};

    if(title) payload.title = title;
    if(description) payload.description = description;
    if(price) payload.price = price;
    if(rentingDuration) payload.rentingDuration = rentingDuration;

    return payload;
}

async function addMovie(req, res)
{
    try{
        const files = req.files;
        const parsedBody = parseBody(req.body);
        const others = {};

        const movieId = await movies.addMovie(parsedBody);

        if(files.image)
        {
            const [url, imageName] = await uploadObjectWithId(movieId, files.image[0]);
            parsedBody['imageUrl'] = url;
            others['imageName'] = imageName;
        }
        if(files.video)
        {
            const [url, videoName] = await uploadObjectWithId(movieId, files.video[0]);
            parsedBody['videoUrl'] = url;
            others['videoName'] = videoName;
        }

        await movies.updateMovie(movieId, {...others});

        res.status(200).send({
            ...others,
            ...parsedBody,
        });
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
        
        if(!movieId)
        {
            throw new Error('Please add movieId parameter');
        }

        const movie = await movies.getMovie(movieId);
        if(!movie)
        {
            res.status(404).send("Can't find movie to update");
            return;
        }
        
        const parsedBody = parseBody(req.body);
        const files = req.files;
        const others = {}

        if(files.image)
        {
            let objRes;
            let imageFile = files.image[0];

            if(movie.imageName) objRes = await updateObject(movie.imageName, movieId, imageFile);
            else objRes = await uploadObjectWithId(movieId, files.image[0]);

            if(objRes && objRes.length > 0) 
            {
                others['imageUrl'] = objRes[0];
                parsedBody['imageName'] = objRes[1];
            }
        }
        else if(movie.imageName){
            const imageUrl = await getImageUrl(movie.imageName);
            if(imageUrl) others['imageUrl'] = imageUrl;
        }

        if(files.video)
        {
            let objRes;
            let videoFile = files.video[0];

            if(movie.videoName) objRes = await updateObject(movie.videoName, movieId, videoFile);
            else objRes = await uploadObjectWithId(movieId, files.video[0]);

            if(objRes && objRes.length > 0) 
            {
                others['videoUrl'] = objRes[0];
                parsedBody['videoName'] = objRes[1];
            }
        }
        else if(movie.videoName){
            const videoName = await getVideoUrl(movie.videoName);
            if(videoName) others['videoUrl'] = videoName;
        }

        await movies.updateMovie(movieId, parsedBody);
        
        res.status(200).send({
            ...movie,
            ...parsedBody,
            ...others,
        });
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