const express = require('express');
const { verifyAccessToken } = require('../../middleware/paypal.js');
const paypalHandler = require('./paypal.handler.js');

const router = express.Router();

router.get('/', verifyAccessToken, paypalHandler.createOrder);

module.exports = {router};
