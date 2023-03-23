import jwt from 'jsonwebtoken';
import {env, appSettings} from '../config.js';


export function generateAccessToken(payload)
{
    return jwt.sign(payload, env.JWT_SECRET_KEY, {expiresIn: appSettings.access_token_expiration});
}

export function verifyAccesstoken(accessToken, options)
{
    jwt.verify(accessToken, env.JWT_SECRET_KEY, (err, decoded) => {
        if(options) options(err, decoded);
    });
}

export function isAccessTokenValid(accessToken)
{
    let isValid = false;
    verifyAccesstoken(accessToken, (err, decoded) => 
    {
        if(!err) isValid = true;
    });
    return isValid;
}