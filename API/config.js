import { configDotenv } from 'dotenv';

//Configuring environment 
configDotenv();

const url_collection = process.env.URL_COLLECTION_NAME;
const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;

export {
    url_collection,
    mongo_url,
    port
}