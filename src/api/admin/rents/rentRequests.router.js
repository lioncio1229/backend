const express = require('express');
const { errors } = require('../../../config');
const verifyResourceAccess = require('../../../middleware/validation.js');
const rentRequestsHandler = require('./rentRequests.handler.js');

const router = express.Router();

router.get('/rents', verifyResourceAccess(errors.noAccess), rentRequestsHandler.getAllRentRequest);
router.delete('/rents/:rentRequestId', verifyResourceAccess(errors.noAccess), rentRequestsHandler.deleteRentRequest);

module.exports = { router };