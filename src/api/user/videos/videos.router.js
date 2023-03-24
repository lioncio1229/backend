const express = require('express');
const { errors } = require('../../../config');
const verifyResourceAccess = require('../../../middleware/validation.js');
const { getVideos } = require('./videos.handler.js');

const router = express.Router();

router.get('/videos', verifyResourceAccess(errors.noAccess), getVideos);

module.exports = {router};