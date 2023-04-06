const oauthRouter = require('./api/auth/auth.router.js');
const usersRouter = require('./api/users/users.router.js');
const moviesRouter = require('./api/movies/movie.router.js');
const rents = require('./api/rents/rents.router.js');

module.exports = function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Movie Store!');
    });
    
    app.use('/api/auth', oauthRouter.router);
    app.use('/api/users', usersRouter.router);
    app.use('/api/movies', moviesRouter.router);
    app.use('/api/rents', rents.router);
}


