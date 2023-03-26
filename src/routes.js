const oauthRouter = require('./api/auth/oauth.router.js');
const customerRouter = require('./api/admin/customers/customer.router.js');
const adminVideoRouter = require('./api/admin/videos/video.router.js');
const userVideosRouter = require('./api/user/videos/videos.router.js');
const rentRequestsRouter = require('./api/admin/rent-requests/rentRequests.router.js');
const rents = require('./api/user/rents/rents.router.js');

module.exports = function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Video Store!');
    });
    
    app.use('/api/oauth', oauthRouter.router);
    app.use('/api/admin', customerRouter.router);
    app.use('/api/admin', adminVideoRouter.router);
    app.use('/api/admin', rentRequestsRouter.router);
    app.use('/api/user', userVideosRouter.router);
    app.use('/api/user', rents.router);
}


