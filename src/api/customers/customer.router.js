import express from 'express';
import { errors } from '../../config.js';
import * as customerController from './customer.handler.js';
import verifyResourceAccess from '../../middleware/validation.js';

const router = express.Router();

router.post('/', verifyResourceAccess(errors.noAccess), customerController.addCustomer);
router.get('/', verifyResourceAccess(errors.noAccess), customerController.getCustomers);
router.put('/:username', verifyResourceAccess(errors.noAccess), customerController.updateCustomer);
router.delete('/:username', verifyResourceAccess(errors.noAccess), customerController.deleteCustomer);

export default {router};