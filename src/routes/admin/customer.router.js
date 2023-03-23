import express from 'express';
import { errors } from '../../config.js';
import * as customerController from '../../controllers/admin/customer.controller.js';
import verifyResourceAccess from '../../middleware/validation.js';

const router = express.Router();

router.post('/', verifyResourceAccess(errors.noAccess), customerController.addCustomer);
router.get('/', verifyResourceAccess(errors.noAccess), customerController.getCustomers);

export default {router};