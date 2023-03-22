import {env} from '../config.js';
import jwt from 'jsonwebtoken';

async function validation(req, res, next)
{
    try{
        const accessToken = req.session.accessToken;
        jwt.verify(accessToken, env.JWT_SECRET_KEY, (err, decoded) => {
            if(err) req.hasValidationError = true;
            else req.hasValidationError = false;
            next();
        });
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export default validation;