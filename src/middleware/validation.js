const { isTokenBlacklisted } = require('../services/accessTokens.js');
const { verifyAccesstoken } = require('../helpers/accessToken.js');
const CustomError = require('../helpers/customError.js');

function verifyResourceAccess({message='Error', errorCode=500})
{
    return async (req, res, next) => {
        try{
            const accessToken = req.session.accessToken;
            const _isTokenBlacklisted = await isTokenBlacklisted(accessToken);
            if(_isTokenBlacklisted) throw new CustomError(message, {errorCode});
            
            verifyAccesstoken(accessToken, (err, decoded) => {
                if(err) throw new CustomError(message, {errorCode});
                else req.username = decoded.username;
            });
            next();
        }
        catch(e)
        {
            res.status(e.options?.errorCode).send(e.message);
        }
    }
}

module.exports = verifyResourceAccess;