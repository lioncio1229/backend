const express = require('express');
const { errors } = require('../../config.js');
const verifyResourceAccess = require('../../middleware/validation.js');
const usersController = require('./users.handler.js');
const permissionsHandler = require('./permissions.handler.js');
const videosHandler = require('./videos.handler.js');
const rentsHandler = require('./rents.handler.js');

const router = express.Router();

router.post('/', verifyResourceAccess(), usersController.addUser);
router.get('/', verifyResourceAccess(), usersController.getUsers);
router.put('/:username', verifyResourceAccess(), usersController.updateUser);
router.delete('/:username', verifyResourceAccess(), usersController.deleteUser);

router.post('/permissions/', verifyResourceAccess(), permissionsHandler.addPermission);
router.get('/permissions/', verifyResourceAccess(), permissionsHandler.getPermissions);
router.get('/permissions/:name', verifyResourceAccess(), permissionsHandler.getPermissions);
router.delete('/permissions/:name', verifyResourceAccess(), permissionsHandler.deletePermission);

router.get('/permissions/:name/actions', verifyResourceAccess(), permissionsHandler.getActions);
router.post('/permissions/:name/actions/:actionName', verifyResourceAccess(), permissionsHandler.addAction);
router.delete('/permissions/:name/actions/:actionName', verifyResourceAccess(), permissionsHandler.deleteAction);

router.get('/videos', verifyResourceAccess(), videosHandler.getVideos);

router.post('/rents', verifyResourceAccess(), rentsHandler.addRent);
router.get('/rents', verifyResourceAccess(), rentsHandler.getRents);

module.exports = { router };