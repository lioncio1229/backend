const express = require('express');
const videoHandler = require('./video.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');
const { permissionNames, actions } = require('../../config.js');

const router = express.Router();

router.post('/', verifyResourceAccess(permissionNames.videos, actions.create), videoHandler.addVideo);
router.get('/:videoId', verifyResourceAccess(permissionNames.videos, actions.get), videoHandler.getVideo);
router.get('/', verifyResourceAccess(permissionNames.videos, actions.get), videoHandler.getVideos);
router.put('/:videoId', verifyResourceAccess(permissionNames.videos, actions.update), videoHandler.updateVideo);
router.delete('/:videoId', verifyResourceAccess(permissionNames.videos, actions.delete), videoHandler.deleteVideo);

module.exports = { router };
