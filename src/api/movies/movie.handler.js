const movies = require("../../services/movies.js");
const rents = require("../../services/rents.js");
const {
    uploadObjectWithId,
    updateObject,
    getImageUrl,
    getVideoUrl,
    removeObject,
} = require("../../minio-client.js");

const {appSettings: {supportedImageTypes, supportedVideoTypes}} = require('../../config.js');
const { ObjectId } = require('mongodb');
const CustomError = require('../../helpers/customError.js');

function parseBody({title, description, price, rentingDuration})
{
    const payload = {};

    if(title) payload.title = title;
    if(description) payload.description = description;
    if(price) payload.price = price;
    if(rentingDuration) payload.rentingDuration = rentingDuration;

    return payload;
}

async function mapObjectUrl(movieList)
{
    const newMovieList = [];
    for(const movie of movieList)
    {
        const others = {};
        if(movie.imageName) 
        {
            others['imageUrl'] = await getImageUrl(movie.imageName);
        }
        if(movie.videoName)
        {
            others['videoUrl'] = await getVideoUrl(movie.videoName);
        }
        newMovieList.push({...movie, ...others});
    }
    return newMovieList;
}

function checkIfMimeTypeSupported(mimeType)
{
    const [type, ext] = mimeType.split('/');
    const supported = type === 'image' ? supportedImageTypes : supportedVideoTypes;

    if(!supported.includes(ext))
    {
        throw new CustomError(`${ext} ${type} file type is not supported`, {errorCode: 415});
    }
}

async function addMovie(req, res)
{
    try{
        const files = req.files;
        const parsedBody = parseBody(req.body);
        const urls = {}, others = {};

        const movieId = new ObjectId();

        if(files.image)
        {
            const image = files.image[0];
            checkIfMimeTypeSupported(image.mimetype);

            const [url, imageName] = await uploadObjectWithId(movieId, image);
            urls['imageUrl'] = url;
            others['imageName'] = imageName;
        }
        if(files.video)
        {
            const video = files.video[0];
            checkIfMimeTypeSupported(video.mimetype);

            const [url, videoName] = await uploadObjectWithId(movieId, video);
            urls['videoUrl'] = url;
            others['videoName'] = videoName;
        }

        await movies.addMovie({_id: movieId, ...parsedBody, ...others});

        res.status(200).send({
            _id: movieId,
            ...urls,
            ...others,
            ...parsedBody,
        });
    }
    catch(e)
    {
        res.status(e.options?.errorCode || 500).send(e.message);
    }
}

async function getMovie(req, res)
{
    try{
        const {movieId} = req.params;
        const movie = await movies.getMovie(movieId);
        const others = {};
        if(movie)
        {
            if(movie.imageName) others['imageUrl'] = await getImageUrl(movie.imageName);
            if(movie.videoName) others['videoUrl'] = await getVideoUrl(movie.videoName);
        }
        res.status(200).send({...movie, ...others});
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getMovies(req, res)
{
    try{
        let movieList = await movies.getMovies();
        movieList = await mapObjectUrl(movieList);
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

        let movieList = await movies.getMovies();
        movieList = await mapObjectUrl(movieList);
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

        if(files && files.image)
        {
            let objRes;
            let imageFile = files.image[0];

            if(movie.imageName) objRes = await updateObject(movie.imageName, movieId, imageFile);
            else objRes = await uploadObjectWithId(movieId, imageFile);

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

        if(files && files.video)
        {
            let objRes;
            let videoFile = files.video[0];

            if(movie.videoName) objRes = await updateObject(movie.videoName, movieId, videoFile);
            else objRes = await uploadObjectWithId(movieId, videoFile);

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

        const movie = await movies.getMovie(movieId);
        if(!movie)
        {
            res.status(404).send("Can't find movie to be deleted");
            return;
        }

        if(movie.imageName) await removeObject(movie.imageName, 'image');
        if(movie.videoName) await removeObject(movie.videoName, 'video');

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