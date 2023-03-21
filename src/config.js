import dotenv from "dotenv";

dotenv.config();

const env = process.env;
const app = {
    access_token_expiration: '10s'
}

export {env, app};