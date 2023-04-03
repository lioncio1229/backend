const oauthRouter = require('./api/auth/auth.router.js');
const usersRouter = require('./api/users/users.router.js');
const videoRouter = require('./api/videos/video.router.js');
const rentRequestsRouter = require('./api/rent-requests/rentRequests.router.js');
const rents = require('./api/rents/rents.router.js');

module.exports = function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Video Store!');
    });
    
    app.use('/api/auth', oauthRouter.router);
    app.use('/api/users', usersRouter.router);
    app.use('/api/videos', videoRouter.router);
    app.use('/api/rent-requests', rentRequestsRouter.router);
    app.use('/api/rents', rents.router);
}


