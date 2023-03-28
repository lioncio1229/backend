const { addAdmin, getAdmins, getAdmin } = require('../../services/admin.js');
const { getCustomer } = require('../../services/customers.js');
const { blacklistToken } = require('../../services/accessTokens.js');
const { generateAccessToken, isAccessTokenValid } = require('../../helpers/accessToken.js');
const { errors } = require('../../config.js');
const CustomError = require('../../helpers/customError.js');

async function signup(req, res)
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

async function signin(req, res)
{
    try{

        if(isAccessTokenValid(req.session.accessToken))
        {
            const {message, errorCode} = errors.alreadyLogin;
            throw new CustomError(message, errorCode);
        }

        const {role} = req.query;

        const {username, password} = req.body;

        let token;

        if(role === 'admin')
        {
            const admin = await getAdmin(username);
            if(admin && admin.password === password)
            {
                token = generateAccessToken(admin);
            }
        }
        else{
            const user = await getCustomer(username);
            if(user && user.password === password)
            {
                token = generateAccessToken(user);
            }
        }
        
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

async function signout(req, res)
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

module.exports = {
    signup,
    signin,
    signout,
}