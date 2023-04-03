const express = require('express');
const { errors } = require('../../config');
const verifyResourceAccess = require('../../middleware/validation.js');
const rentRequestsHandler = require('./rentRequests.handler.js');

const router = express.Router();

router.post('/', verifyResourceAccess(), rentRequestsHandler.addRentRequest);
router.get('/', verifyResourceAccess(), rentRequestsHandler.getAllRentRequest);
router.delete('/:rentRequestId', verifyResourceAccess(), rentRequestsHandler.deleteRentRequest);

module.exports = { router };