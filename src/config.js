import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const appSettings = {
    access_token_expiration: '10s'
}
const errors = {
    alreadyLogin: {message: 'Already Login', errorCode: 406},
    alreadyLogout: {message: 'Already Logout', errorCode: 204},
    noAccess: {message: "You have no access to this resource", errorCode: 403},
}

export {env, appSettings, errors};