import jwt from 'jsonwebtoken';
import {env, app} from '../config.js';

export default function generateAccessToken(payload)
{
    return jwt.sign(payload, env.JWT_SECRET_KEY, {expiresIn: app.access_token_expiration});
}