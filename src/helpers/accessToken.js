const jwt = require('jsonwebtoken');
const { env, appSettings } = require('../config.js');

function generateAccessToken(payload)
{
    return jwt.sign(payload, env.JWT_SECRET_KEY, {expiresIn: appSettings.access_token_expiration});
}

function verifyAccesstoken(accessToken, options)
{
    jwt.verify(accessToken, env.JWT_SECRET_KEY, (err, decoded) => {
        if(options) options(err, decoded);
    });
}

function isAccessTokenValid(accessToken)
{
    let isValid = false;
    verifyAccesstoken(accessToken, (err, decoded) => 
    {
        if(!err) isValid = true;
    });
    return isValid;
}

module.exports = {
    generateAccessToken,
    verifyAccesstoken,
    isAccessTokenValid,
}