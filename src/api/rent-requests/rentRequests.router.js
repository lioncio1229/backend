const express = require('express');
const { errors } = require('../../config');
const verifyResourceAccess = require('../../middleware/validation.js');
const rentRequestsHandler = require('./rentRequests.handler.js');

const router = express.Router();

router.post('/:rentRequestId', verifyResourceAccess(errors.noAccess), rentRequestsHandler.acceptRentRequest);
router.get('/', verifyResourceAccess(errors.noAccess), rentRequestsHandler.getAllRentRequest);
router.delete('/:rentRequestId', verifyResourceAccess(errors.noAccess), rentRequestsHandler.deleteRentRequest);

module.exports = { router };