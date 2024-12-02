import express from 'express';
import { mongo_url, port } from './config.js';
import shortUrls from './routes/shortUrl.js';
import auth from './routes/auth.js';
import user from './routes/user.js';
import connectDB from './connection.js';
import { errorHandler } from './middlewares/errorHandling.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import verifyToken from './middlewares/verifyUser.js';

const app = express();
app.use(cors({
    origin: 'https://short-eta.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true   
}));

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
app.use('/api/v1/shortUrls', verifyToken, shortUrls);
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', verifyToken, user);
