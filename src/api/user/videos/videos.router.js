const express = require('express');
const { errors } = require('../../../config');
const verifyResourceAccess = require('../../../middleware/validation.js');
const videosHandler = require('./videos.handler.js');

const router = express.Router();

router.get('/videos', verifyResourceAccess(errors.noAccess), videosHandler.getVideos);
router.post('/videos/:videoId', verifyResourceAccess(errors.noAccess), videosHandler.requestRent);

module.exports = { router };