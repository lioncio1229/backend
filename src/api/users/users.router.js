const express = require('express');
const { errors } = require('../../config.js');
const usersController = require('./users.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');

const router = express.Router();

router.post('/', verifyResourceAccess(), usersController.addUser);
router.get('/', verifyResourceAccess(), usersController.getUsers);
router.put('/:username', verifyResourceAccess(), usersController.updateUser);
router.delete('/:username', verifyResourceAccess(), usersController.deleteUser);

module.exports = { router };