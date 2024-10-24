import express from 'express';
import { mongo_url } from './config.js';
import shortUrlRouter from './routes/shortUrl.js';
import connectDB from './connection.js';
import { errorHandler } from './middlewares/errorHandling.js';

const PORT = 3000;
const app = express();

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);

//Connecting to the DB
connectDB(mongo_url).then( () => {
    console.log('Mongo DB Connected');

    //Starting server
    app.listen(PORT, () => {
        console.log('Server Started on port : ' + PORT);
    });

}).catch((e) => {
    console.log('Failed to connect to Mongo DB' + e);
});

//Routes
app.use('/shortUrl', shortUrlRouter);
