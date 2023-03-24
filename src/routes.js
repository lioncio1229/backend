const oauthRouter = require('./api/auth/oauth.router.js');
const customerRouter = require('./api/admin/customers/customer.router.js');
const videoRouter = require('./api/admin/videos/video.router.js');
const userVideoRouter = require('./api/user/videos/videos.router.js');

module.exports = function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Video Store!');
    });
    
    app.use('/api/oauth', oauthRouter.router);
    app.use('/api/admin', customerRouter.router);
    app.use('/api/admin', videoRouter.router);
    app.use('/api/user', userVideoRouter.router);
}


