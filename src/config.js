import dotenv from "dotenv";

dotenv.config();

const {JWT_SECRET_KEY} = process.env;
const app = {
    access_token_expiration: '10s'
}

export {JWT_SECRET_KEY, app};