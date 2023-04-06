const express = require('express');
const verifyResourceAccess = require('../../middleware/validation.js');
const usersController = require('./users.handler.js');
const permissionsHandler = require('./permissions.handler.js');
const moviesHandler = require('../movies/movie.handler.js');
const rentsHandler = require('../rents/rents.handler.js');
const { permissionNames, actions } = require('../../config.js');

const router = express.Router();

router.post('/', verifyResourceAccess(permissionNames.users, actions.create), usersController.addUser);
router.get('/', verifyResourceAccess(permissionNames.users, actions.get), usersController.getUsers);
router.get('/:username', verifyResourceAccess(permissionNames.users, actions.get), usersController.getUsers);
router.put('/:username', verifyResourceAccess(permissionNames.users, actions.update), usersController.updateUser);
router.delete('/:username', verifyResourceAccess(permissionNames.users, actions.delete), usersController.deleteUser);

router.post('/:username/permissions/', verifyResourceAccess(permissionNames.permissions, actions.create), permissionsHandler.addPermission);
router.get('/:username/permissions/', verifyResourceAccess(permissionNames.permissions, actions.get), permissionsHandler.getPermissions);
router.get('/:username/permissions/:name', verifyResourceAccess(permissionNames.permissions, actions.update), permissionsHandler.getPermissions);
router.delete('/:username/permissions/:name', verifyResourceAccess(permissionNames.permissions, actions.delete), permissionsHandler.deletePermission);

router.get('/:username/permissions/:name/actions', verifyResourceAccess(permissionNames.permissions, actions.get), permissionsHandler.getActions);
router.post('/:username/permissions/:name/actions', verifyResourceAccess(permissionNames.permissions, actions.create), permissionsHandler.addAction);
router.delete('/:username/permissions/:name/actions/:actionName', verifyResourceAccess(permissionNames.permissions, actions.delete), permissionsHandler.deleteAction);

router.get('/:username/movies', verifyResourceAccess(permissionNames.userMovies, actions.get), moviesHandler.getMoviesByUser);

router.get('/:username/rents', verifyResourceAccess(permissionNames.userRents, actions.get), rentsHandler.getRentsByUser);

module.exports = { router };