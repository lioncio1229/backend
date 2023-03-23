import { addAdmin, getAdmins, getAdmin } from './admin.js';
import { blacklistToken } from './accessTokens.js';
import { generateAccessToken, isAccessTokenValid } from '../../helpers/accessToken.js';
import { errors } from '../../config.js';
import CustomError from '../../helpers/customError.js';

export async function signup(req, res)
{
    try{
        const {username, fullname, password} = req.body;
        const payload = {username, fullname, password};
        const token = generateAccessToken(payload);
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

export async function signin(req, res)
{
    try{

        if(isAccessTokenValid(req.session.accessToken))
        {
            const {message, errorCode} = errors.alreadyLogin;
            throw new CustomError(message, errorCode);
        }

        const {username, password} = req.body;

        let token;
        const admins = await getAdmins();
        admins.forEach(admin => {
            if(admin.username === username && admin.password === password)
            {
                token = generateAccessToken(admin);
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
        res.status(e.options?.errorCode || 500).send(e.message);
    }
}

export async function signout(req, res)
{
    try{

        if(!isAccessTokenValid(req.session.accessToken))
        {
            const {message, errorCode} = errors.alreadyLogout;
            throw new CustomError(message, errorCode);
        }
        else{
            await blacklistToken(req.session.accessToken);
            req.session.accessToken = null;
            res.status(200).send('Logout');
        }
    }
    catch(e)
    {
        res.status(e.options?.errorCode || 500).send(e.message);
    }
}