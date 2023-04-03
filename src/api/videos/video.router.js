const express = require('express');
const videoHandler = require('./video.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');
const { errors } = require('../../config.js');

const router = express.Router();

router.post('/', verifyResourceAccess('videos', 'add'), videoHandler.addVideo);
router.get('/:videoId', verifyResourceAccess(), videoHandler.getVideo);
router.get('/', verifyResourceAccess(), videoHandler.getVideos);
router.put('/:videoId', verifyResourceAccess('videos', 'update'), videoHandler.updateVideo);
router.delete('/:videoId', verifyResourceAccess('videos', 'delete'), videoHandler.deleteVideo);

module.exports = { router };
