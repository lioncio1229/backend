import express from 'express';
import videoHandler from './video.handler.js';
import verifyResourceAccess from '../../middleware/validation.js';
import { errors } from '../../config.js';

const router = express.Router();

router.post('/', verifyResourceAccess(errors.noAccess), videoHandler.addVideo);

export default {router};
