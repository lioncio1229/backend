const express = require('express');
const videoHandler = require('./video.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');
const { errors } = require('../../config.js');

const router = express.Router();

router.post('/videos/', verifyResourceAccess(errors.noAccess), videoHandler.addVideo);
router.get('/videos/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.getVideo);
router.get('/videos/', verifyResourceAccess(errors.noAccess), videoHandler.getVideos);
router.put('/videos/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.updateVideo);
router.delete('/videos/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.deleteVideo);

module.exports = { router };
