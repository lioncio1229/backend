import {env, app} from '../config.js';
import jwt from 'jsonwebtoken';
import { addAdmin, getAdmins, getAdmin } from '../services/admin.services.js';

async function signup(req, res)
{
    try{
        const {username, fullname, password} = req.body;
        const payload = {username, fullname, password};
        const token = jwt.sign(payload, env.JWT_SECRET_KEY, {expiresIn: app.access_token_expiration});
        const admin = await getAdmin(username);

        if(admin?.username === username)
        {
            res.status(403).send('Username already exist');
            return;
        }

        await addAdmin({username, fullname, password});
        req.session.accessToken = token;
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
            req.session.accessToken = token;
            res.status(200).send({});
        }
        else
        {
            res.status(401).send('Please Signup');
        }
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export function signout(req, res)
{
    console.log('accessToken: ', req.session.accessToken);
    res.send('Logout');
}

export default {
    signup,
    signin,
    signout,
}