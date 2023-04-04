const express = require('express');
const verifyResourceAccess = require('../../middleware/validation.js');
const rentRequestsHandler = require('./rentRequests.handler.js');
const { permissionNames, actions } = require('../../config.js');

const router = express.Router();

router.post('/', verifyResourceAccess(permissionNames.rentsRequests, actions.create), rentRequestsHandler.addRentRequest);
router.get('/', verifyResourceAccess(permissionNames.rentsRequests, actions.get), rentRequestsHandler.getAllRentRequest);
router.delete('/:rentRequestId', verifyResourceAccess(permissionNames.rentsRequests, actions.delete), rentRequestsHandler.deleteRentRequest);

module.exports = { router };