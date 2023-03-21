import {env} from '../config.js';

async function validation(req, res, next)
{
    try{
        const {authorization} = req.headers;
        if(authorization)
        {
            const accessToken = authorization.split(' ')[1];

            jwt.verify(accessToken, env.JWT_SECRET_KEY, (err, decoded) => {
                if(err) throw new Error('Invalid Token');
                else{
                    res.send(accessToken);
                }
            });
            next();
            return;
        }
        throw new Error('Access token Required');
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export default validation;