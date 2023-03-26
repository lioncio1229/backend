const express = require('express');
const { errors } = require('../../../config');
const verifyResourceAccess = require('../../../middleware/validation.js');
const rentRequestsHandler = require('./rentRequests.handler.js');

const router = express.Router();

router.post('/rent-requests', verifyResourceAccess(errors.noAccess), rentRequestsHandler.requestRent);

module.exports = { router };