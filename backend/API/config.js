import { configDotenv } from 'dotenv';

//Configuring environment 
configDotenv();

const url_collection = process.env.URL_COLLECTION_NAME;
const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;
const user_collection = process.env.USER_COLLECTION_NAME;
const salt_round = process.env.SALT_ROUND;
const jwt_secret = process.env.JWT_SECRET;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_url = process.env.REDIRECT_URI;

export {
    url_collection,
    mongo_url,
    port,
    user_collection,
    salt_round,
    jwt_secret,
    client_id,
    client_secret,
    redirect_url
}