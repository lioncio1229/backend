import {JWT_SECRET_KEY, app} from '../config.js';
import jwt from 'jsonwebtoken';

const adminsMockDb = [];

async function signup(req, res)
{
    try{
        const {username, fullname, password} = req.body;
        const payload = {username, fullname, password};
        const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: app.access_token_expiration});

        adminsMockDb.push({username, fullname, password});
        res.send(token);
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
        adminsMockDb.forEach(admin => {
            if(admin.username === username && admin.password === password)
            {
                token = jwt.sign(admin, JWT_SECRET_KEY, {expiresIn: app.access_token_expiration});
            }
        });
        
        if(token)
        {
            res.send(token);
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