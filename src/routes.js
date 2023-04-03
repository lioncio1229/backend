const oauthRouter = require('./api/auth/auth.router.js');
const usersRouter = require('./api/users/users.router.js');
const videoRouter = require('./api/videos/video.router.js');
const userVideosRouter = require('./api/users/videos/videos.router.js');
const rentRequestsRouter = require('./api/rent-requests/rentRequests.router.js');
const rentsUser = require('./api/users/rents/rents.router.js');
const rents = require('./api/rents/rents.router.js');
const permissionRouter = require('./api/users/permissions/permissions.router.js');

module.exports = function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Video Store!');
    });
    
    app.use('/api/auth', oauthRouter.router);
    app.use('/api/users', usersRouter.router);
    app.use('/api/videos', videoRouter.router);
    app.use('/api/rent-requests', rentRequestsRouter.router);
    app.use('/api/users/videos', userVideosRouter.router);
    app.use('/api/users/rents', rentsUser.router);
    app.use('/api/rents', rents.router);
    app.use('/api/users/permissions', permissionRouter.router);
}


