const express = require('express');
const moviesHandler = require('./movie.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');
const { permissionNames, actions } = require('../../config.js');

const router = express.Router();

router.post('/', verifyResourceAccess(permissionNames.movies, actions.create), moviesHandler.addMovie);
router.get('/:movieId', verifyResourceAccess(permissionNames.movies, actions.get), moviesHandler.getMovie);
router.get('/', verifyResourceAccess(permissionNames.movies, actions.get), moviesHandler.getMovies);
router.put('/:movieId', verifyResourceAccess(permissionNames.movies, actions.update), moviesHandler.updateMovie);
router.delete('/:movieId', verifyResourceAccess(permissionNames.movies, actions.delete), moviesHandler.deleteMovie);

module.exports = { router };
