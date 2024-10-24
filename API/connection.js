import mongoose from 'mongoose';

const connectDB = async (url) => {    
    try{
        await mongoose.connect(url);        
    }catch(e){
        console.error('Database connection error : ' + e);
        process.exit(1);
    }
}

export default connectDB;