const express = require('express');
const { errors } = require('../../../config');
const verifyResourceAccess = require('../../../middleware/validation.js');
const videosHandler = require('./videos.handler.js');

const router = express.Router();

router.get('/', verifyResourceAccess(), videosHandler.getVideos);

module.exports = { router };