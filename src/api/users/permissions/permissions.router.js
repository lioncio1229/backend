const express = require('express');
const verifyResourceAccess = require('../../../middleware/validation.js');
const permissionsHandler = require('../permissions/permissions.handler.js');

const router = express.Router();

router.post('/', verifyResourceAccess(), permissionsHandler.addPermission);
router.get('/', verifyResourceAccess(), permissionsHandler.getPermissions);
router.get('/:name', verifyResourceAccess(), permissionsHandler.getPermissions);
router.delete('/:name', verifyResourceAccess(), permissionsHandler.deletePermission);

router.get('/:name/actions', verifyResourceAccess(), permissionsHandler.getActions);
router.post('/:name/actions/:actionName', verifyResourceAccess(), permissionsHandler.addAction);
router.delete('/:name/actions/:actionName', verifyResourceAccess(), permissionsHandler.deleteAction);

module.exports = { router };