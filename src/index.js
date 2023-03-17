import express from 'express';
import cors from 'cors';
import oauthRouter from './routes/oauth.router.js';
import validation from './middleware/validation.js';

const app = express();
const port = 3000;

const corsOptions = {
    credentials: true,
    origin: true,
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Bogsy Video Store!');
});

app.use('/api/oauth', oauthRouter.router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});