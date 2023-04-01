const express = require('express');
const { errors } = require('../../config.js');
const usersController = require('./users.handler.js');
const verifyResourceAccess = require('../../middleware/validation.js');

const router = express.Router();

router.post('/', verifyResourceAccess(errors.noAccess), usersController.addUser);
router.get('/', verifyResourceAccess(errors.noAccess), usersController.getUsers);
router.put('/:username', verifyResourceAccess(errors.noAccess), usersController.updateUser);
router.delete('/:username', verifyResourceAccess(errors.noAccess), usersController.deleteUser);

module.exports = { router };