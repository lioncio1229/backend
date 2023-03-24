import { isTokenBlacklisted } from '../services/accessTokens.js';
import { verifyAccesstoken } from '../helpers/accessToken.js';
import CustomError from '../helpers/customError.js';

function verifyResourceAccess({message='Error', errorCode=500})
{
    return async (req, res, next) => {
        try{
            const accessToken = req.session.accessToken;
            const _isTokenBlacklisted = await isTokenBlacklisted(accessToken);
            if(_isTokenBlacklisted) throw new CustomError(message, {errorCode});
            
            verifyAccesstoken(accessToken, (err, decoded) => {
                if(err) throw new CustomError(message, {errorCode});
            });
            next();
        }
        catch(e)
        {
            res.status(e.options?.errorCode).send(e.message);
        }
    }
}

export default verifyResourceAccess;