const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

const appSettings = {
    access_token_expiration: '3600s'
}
const errors = {
    alreadyLogin: {message: 'Already Login', errorCode: 406},
    alreadyLogout: {message: 'Already Logout', errorCode: 204},
    noAccess: {message: "You have no access to this resource", errorCode: 403},
}

const permissionNames = {
    users: 'users',
    movies: 'movies',
    rents: 'rents',
    userRents: 'userRents',
    userMovies: 'userMovies',
    permissions: 'permissions',
}

const actions = {
    get: 'get',
    create: 'create',
    update: 'update',
    delete: 'delete',
}

module.exports = { env, appSettings, errors, permissionNames, actions };