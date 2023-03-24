import oauthRouter from './api/auth/oauth.router.js';
import customerRouter from './api/admin/customers/customer.router.js';
import videoRouter from './api/admin/videos/video.router.js';

export default function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Video Store!');
    });
    
    app.use('/api/oauth', oauthRouter.router);
    app.use('/api/admin', customerRouter.router);
    app.use('/api/admin', videoRouter.router);
}


