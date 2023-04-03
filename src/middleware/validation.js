const { isTokenBlacklisted } = require('../services/accessTokens.js');
const { verifyAccesstoken } = require('../helpers/accessToken.js');
const CustomError = require('../helpers/customError.js');
const {errors} = require('../config.js');
const { getUser } = require('../services/users.js');

function verifyResourceAccess(resourceName=null, action=null)
{
    const { message, errorCode } = errors.noAccess;
    return async (req, res, next) => {
        try{
            const accessToken = req.session.accessToken;
            const _isTokenBlacklisted = await isTokenBlacklisted(accessToken);
            if(_isTokenBlacklisted) throw new CustomError(message + ': Token is blacklisted.', {errorCode});
            
            verifyAccesstoken(accessToken, (err, decoded) => {
                if(err) throw new CustomError(message + ': Token is invalid.', {errorCode});
                else req.username = decoded.username;
            });

            if(resourceName && action)
            {
                const user = await getUser(req.username);
                const permission = user.permissions.find(v => v.name === resourceName);
                if(!permission || (permission && !permission.actions.includes(action)))
                    throw new CustomError(message+ ': Requires permission to access this resource.', {errorCode});
            }

            next();
        }
        catch(e)
        {
            res.status(e.options?.errorCode).send(e.message);
        }
    }
}

module.exports = verifyResourceAccess;