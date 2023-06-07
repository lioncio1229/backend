const movies = require("../../services/movies.js");
const rents = require("../../services/rents.js");
const {uploadImage, uploadVideo, getImagePresignedUrl, getVideoPresignedUrl} = require('../../minio-client.js');


async function addMovie(req, res)
{
    try{
        const files = req.files;

        if(files.image.length === 0 || files.video.length === 0)
        {
            res.status(400).send('Please upload required files');
        }

        const image = files.image[0];
        const imgName =  `img-${Date.now()}.${image.mimetype.split('/')[1]}`;
        await uploadImage(imgName, image.buffer, image.size);
        const presignedImageUrl = await getImagePresignedUrl(imgName);

        const video = files.video[0];
        const videoName = `video-${Date.now()}.${video.mimetype.split('/')[1]}`;

        await uploadVideo(videoName, video.buffer, video.size)
        const presignedVideoUrl = await getVideoPresignedUrl(videoName);

        req.body['imageName'] = imgName;
        req.body['videoName'] = videoName;
        const movieId = await movies.addMovie(req.body);

        res.status(200).send({
            movieId,
            imageUrl: presignedImageUrl,
            videoUrl: presignedVideoUrl,
            ...req.body,
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