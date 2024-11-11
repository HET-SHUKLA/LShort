import express from 'express';
import { mongo_url, port } from './config.js';
import shortUrls from './routes/shortUrl.js';
import auth from './routes/auth.js';
import connectDB from './connection.js';
import { errorHandler } from './middlewares/errorHandling.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(errorHandler);

//Connecting to the DB
connectDB(mongo_url).then( () => {
    console.log('Mongo DB Connected');

    //Starting server
    app.listen(port, () => {
        console.log('Server Started on port : ' + port);
    });

}).catch((e) => {
    console.log('Failed to connect to Mongo DB' + e);
});

//Routes
app.use('/api/v1/shortUrls', shortUrls);
app.use('/api/v1/auth', auth);
