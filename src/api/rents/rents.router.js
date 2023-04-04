const express = require('express');
const verifyResourceAccess = require('../../middleware/validation.js');
const rentsHandler = require('../rents/rents.handler.js');
const { permissionNames, actions } = require('../../config.js');

const router = express.Router();

router.post('/', verifyResourceAccess(permissionNames.rents, actions.create), rentsHandler.addRent);
router.get('/', verifyResourceAccess(permissionNames.rents, actions.get), rentsHandler.getRents);
router.delete('/:rentId', verifyResourceAccess(permissionNames.rents, actions.delete), rentsHandler.deleteRent);

module.exports = { router };