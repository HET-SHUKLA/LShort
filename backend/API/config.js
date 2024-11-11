import { configDotenv } from 'dotenv';

//Configuring environment 
configDotenv();

const url_collection = process.env.URL_COLLECTION_NAME;
const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;
const user_collection = process.env.USER_COLLECTION_NAME;
const salt_round = process.env.SALT_ROUND;
const jwt_secret = process.env.JWT_SECRET;

export {
    url_collection,
    mongo_url,
    port,
    user_collection,
    salt_round,
    jwt_secret
}