const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

const appSettings = {
    access_token_expiration: '3600s',
    paypalDomain: env.NODE_ENV === 'development' || env.PAYPAL_TEST ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com',
    imagesBucketName: 'images-bucket',
    videosBucketName: 'videos-bucket',
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