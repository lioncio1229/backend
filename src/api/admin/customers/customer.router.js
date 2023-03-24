const express = require('express');
const { errors } = require('../../../config.js');
const customerController = require('./customer.handler.js');
const verifyResourceAccess = require('../../../middleware/validation.js');

const router = express.Router();

router.post('/customers/', verifyResourceAccess(errors.noAccess), customerController.addCustomer);
router.get('/customers/', verifyResourceAccess(errors.noAccess), customerController.getCustomers);
router.put('/customers/:username', verifyResourceAccess(errors.noAccess), customerController.updateCustomer);
router.delete('/customers/:username', verifyResourceAccess(errors.noAccess), customerController.deleteCustomer);

module.exports = { router };