import express from 'express';
import oauthController from '../controllers/oauth.controller.js';

const router = express.Router();

router.post('/signup', oauthController.signup);
router.post('/signin', oauthController.signin);

export default {router};