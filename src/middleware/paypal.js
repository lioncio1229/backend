const fetch = require('node-fetch');
const { appSettings, env } = require('../config.js');
const { storeAccessToken, getAccessToken } = require('../services/paymentTokens.js');

async function verifyAccessToken(req, res, next)
{
    try {
        const token = await getAccessToken('paypal');
        let url = appSettings.paypalDomain;

        if(token && token.accessToken)
        {
            url += '/v1/identity/openidconnect/userinfo/?schema=openid';
            let result = await fetch(url, {
                method: 'POST',
                headers:{
                    'Authorization': 'Bearer ' + token.accessToken,
                    'Content-Type': 'application/json',
                }
            });
            result = await result.json(); 
            if(result && !result.error)
            {
                next();
                return;
            }
        }

        url += '/v1/oauth2/token';


        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(env.PAYPAL_CLIENT_ID + ':' + env.PAYPAL_SECRET_KEY).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        result = await result.json();

        const accessToken = result && result.access_token;
        if(!accessToken)
        {
            res.status(500).send(result);
            return;
        }

        const storeResult = await storeAccessToken('paypal', accessToken);

        if(!storeResult)
        {
            res.status(500).send('Error storing access token to the database');
            return;
        }
    
        next();
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    verifyAccessToken
}