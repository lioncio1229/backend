const express = require('express');
const verifyResourceAccess = require('../../middleware/validation.js');
const rentsHandler = require('../rents/rents.handler.js');

const router = express.Router();

router.post('/', verifyResourceAccess(), rentsHandler.addRent);
router.get('/', verifyResourceAccess(), rentsHandler.getRents);
router.delete('/:rentId', verifyResourceAccess(), rentsHandler.deleteRent);

module.exports = { router };