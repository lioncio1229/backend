const express = require('express');
const { errors } = require('../../../config');
const verifyResourceAccess = require('../../../middleware/validation.js');
const rentRequestsHandler = require('./rentRequests.handler.js');

const router = express.Router();

router.get('/rent-requests', verifyResourceAccess(errors.noAccess), rentRequestsHandler.getAllRentRequest);
router.delete('/rent-requests/:rentRequestId', verifyResourceAccess(errors.noAccess), rentRequestsHandler.deleteRentRequest);

module.exports = { router };