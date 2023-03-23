import express from 'express';
import cors from 'cors';
import sessions from 'express-session';
import { env } from './config.js';
import connect from './database/connection.js';
import routes from './routes.js';

const app = express();
const port = 3000;
const maxAge = 1000  * 60 * 2;

const corsOptions = {
    credentials: true,
    origin: true,
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

const sessionObj = {
    secret: env.SESSION_SECRET_KEY,
    name : 'bvs.sid',
    saveUninitialized: false,
    cookie: { maxAge, httpOnly: true},
    resave: false
}

if(env.NODE_ENV === 'production')
{
    app.set('trust proxy', 1);
    sessionObj.cookie.secure = true;
    sessionObj.cookie.sameSite = 'none';
}

app.use(sessions(sessionObj));

routes(app);

connect();
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;