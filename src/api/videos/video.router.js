const express = require('express');
const videoHandler = require('./video.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');
const { errors } = require('../../config.js');

const router = express.Router();

router.post('/', verifyResourceAccess(errors.noAccess), videoHandler.addVideo);
router.get('/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.getVideo);
router.get('/', verifyResourceAccess(errors.noAccess), videoHandler.getVideos);
router.put('/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.updateVideo);
router.delete('/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.deleteVideo);

module.exports = { router };
