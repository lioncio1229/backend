import express from 'express';
import videoHandler from './video.handler.js';
import verifyResourceAccess from '../../../middleware/validation.js';
import { errors } from '../../../config.js';

const router = express.Router();

router.post('/videos/', verifyResourceAccess(errors.noAccess), videoHandler.addVideo);
router.get('/videos/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.getVideo);
router.get('/videos/', verifyResourceAccess(errors.noAccess), videoHandler.getVideos);
router.put('/videos/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.updateVideo);
router.delete('/videos/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.deleteVideo);

export default {router};
