const express = require('express');
const multer = require('multer');
  
const upload = multer();

const moviesHandler = require('./movie.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');
const { permissionNames, actions } = require('../../config.js');

const router = express.Router();

router.post('/', upload.fields([{name: 'image', maxCount: 1}, {name: 'video', maxCount: 1}]), moviesHandler.addMovie);
// router.post('/', upload.fields([{name: 'image', maxCount: 1}, {name: 'video', maxCount: 1}]), verifyResourceAccess(permissionNames.movies, actions.create), moviesHandler.addMovie);
router.get('/:movieId', verifyResourceAccess(permissionNames.movies, actions.get), moviesHandler.getMovie);
router.get('/', verifyResourceAccess(permissionNames.movies, actions.get), moviesHandler.getMovies);
router.put('/:movieId', verifyResourceAccess(permissionNames.movies, actions.update), moviesHandler.updateMovie);
router.delete('/:movieId', verifyResourceAccess(permissionNames.movies, actions.delete), moviesHandler.deleteMovie);

module.exports = { router };
