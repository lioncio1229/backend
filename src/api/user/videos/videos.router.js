import express from 'express';
import { errors } from '../../../config';
import verifyResourceAccess from '../../../middleware/validation.js';

const router = express.Router();

router.get('/videos', verifyResourceAccess(errors.noAccess), () => {});

export default {router};