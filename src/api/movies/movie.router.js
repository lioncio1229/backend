const express = require('express');
const multer = require('multer');
  
const upload = multer();

const moviesHandler = require('./movie.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');
const { permissionNames, actions } = require('../../config.js');

const router = express.Router();

router.post(
  "/",
  verifyResourceAccess(permissionNames.movies, actions.create),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  moviesHandler.addMovie
);

router.get('/:movieId', verifyResourceAccess(permissionNames.movies, actions.get), moviesHandler.getMovie);

router.get('/', verifyResourceAccess(permissionNames.movies, actions.get), moviesHandler.getMovies);

router.put(
  "/:movieId",
  verifyResourceAccess(permissionNames.movies, actions.update),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  moviesHandler.updateMovie
);

router.delete('/:movieId', verifyResourceAccess(permissionNames.movies, actions.delete), moviesHandler.deleteMovie);

module.exports = { router };
