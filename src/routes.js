import oauthRouter from './api/auth/oauth.router.js';
import customerRouter from './api/customers/customer.router.js';

export default function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Video Store!');
    });
    
    app.use('/api/oauth', oauthRouter.router);
    app.use('/api/customers', customerRouter.router);
}


