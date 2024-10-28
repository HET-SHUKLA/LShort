import express from 'express';
import { mongo_url, port } from './config.js';
import shortUrlRouter from './routes/shortUrl.js';
import connectDB from './connection.js';
import { errorHandler } from './middlewares/errorHandling.js';
import cors from 'cors';

const app = express();
app.use(cors()); 

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);

//TODO: Another middleware to log all the data


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
//For dev
//Routes
app.use('/api/v1/shortUrls', shortUrlRouter);