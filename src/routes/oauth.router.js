import express from 'express';
import {signin, signup, signout} from '../controllers/oauth.controller.js';
import validation from '../middleware/validation.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', validation, signin);
router.post('/signout', validation, signout);

export default {router};