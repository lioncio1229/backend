const express = require('express');
const verifyResourceAccess = require('../../middleware/validation.js');
const usersController = require('./users.handler.js');
const permissionsHandler = require('./permissions.handler.js');
const videosHandler = require('./videos.handler.js');
const rentsHandler = require('./rents.handler.js');
const { permissionNames, actions } = require('../../config.js');

const router = express.Router();

router.post('/', verifyResourceAccess(permissionNames.users, actions.create), usersController.addUser);
router.get('/', verifyResourceAccess(permissionNames.users, actions.get), usersController.getUsers);
router.put('/:username', verifyResourceAccess(permissionNames.users, actions.update), usersController.updateUser);
router.delete('/:username', verifyResourceAccess(permissionNames.users, actions.delete), usersController.deleteUser);

router.post('/permissions/', verifyResourceAccess(permissionNames.permissions, actions.create), permissionsHandler.addPermission);
router.get('/permissions/', verifyResourceAccess(permissionNames.permissions, actions.get), permissionsHandler.getPermissions);
router.get('/permissions/:name', verifyResourceAccess(permissionNames.permissions, actions.update), permissionsHandler.getPermissions);
router.delete('/permissions/:name', verifyResourceAccess(permissionNames.permissions, actions.delete), permissionsHandler.deletePermission);

router.get('/permissions/:name/actions', verifyResourceAccess(permissionNames.permissions, actions.get), permissionsHandler.getActions);
router.post('/permissions/:name/actions', verifyResourceAccess(permissionNames.permissions, actions.create), permissionsHandler.addAction);
router.delete('/permissions/:name/actions/:actionName', verifyResourceAccess(permissionNames.permissions, actions.delete), permissionsHandler.deleteAction);

router.get('/videos', verifyResourceAccess(permissionNames.userVideos, actions.get), videosHandler.getVideos);

router.get('/rents', verifyResourceAccess(permissionNames.userRents, actions.get), rentsHandler.getRents);

module.exports = { router };