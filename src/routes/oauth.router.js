import express from 'express';
import oauthController from '../controllers/oauth.controller.js';
import validation from '../middleware/validation.js';

const router = express.Router();

router.post('/signup', oauthController.signup);
router.post('/signin', oauthController.signin);
router.post('/signout', validation, oauthController.signout);

export default {router};