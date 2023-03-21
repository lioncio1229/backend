import {env} from '../config.js';
import jwt from 'jsonwebtoken';

async function validation(req, res, next)
{
    try{
        const accessToken = req.session.accessToken;

        jwt.verify(accessToken, env.JWT_SECRET_KEY, (err, decoded) => {
            if(err) throw new Error('Invalid Token');
            else{
                next();
            }
        });
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export default validation;