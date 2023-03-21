import {env, app} from '../config.js';
import jwt from 'jsonwebtoken';
import { addAdmin, getAdmins } from '../services/admin.services.js';

async function signup(req, res)
{
    try{
        const {username, fullname, password} = req.body;
        const payload = {username, fullname, password};
        const token = jwt.sign(payload, env.JWT_SECRET_KEY, {expiresIn: app.access_token_expiration});
        req.session._id = token;

        await addAdmin({username, fullname, password});
        res.status(200).send({});
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function signin(req, res)
{
    try{
        console.log('session_id', req.session._id);
        if(req.session._id)
        {
            res.send('Aldready signin');
        }

        const {username, password} = req.body;

        let token;
        const admins = await getAdmins();
        admins.forEach(admin => {
            if(admin.username === username && admin.password === password)
            {
                token = jwt.sign(admin, env.JWT_SECRET_KEY, {expiresIn: app.access_token_expiration});
            }
        });
        
        if(token)
        {
            res.status(200).send({});
        }
        else
        {
            throw new Error('Please Signup');
        }
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export default {
    signup,
    signin
}