import express from 'express';
import * as customerController from '../../controllers/admin/customer.controller.js';
import validation from '../../middleware/validation.js';

const router = express.Router();

router.post('/', validation, customerController.addCustomer);

export default {router};