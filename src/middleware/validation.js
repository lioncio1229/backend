import {env} from '../config.js';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../services/accessTokens.js';

async function validation(req, res, next)
{
    try{
        const accessToken = req.session.accessToken;
        const _isTokenBlacklisted = await isTokenBlacklisted(accessToken);
        
        if(!_isTokenBlacklisted)
        {
            jwt.verify(accessToken, env.JWT_SECRET_KEY, (err, decoded) => {
                if(err) req.hasValidationError = true;
                else req.hasValidationError = false;
            });
        }
        else
        {
            req.hasValidationError = true;
        }
        next();
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export default validation;