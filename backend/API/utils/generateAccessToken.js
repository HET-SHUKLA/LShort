import jwt from 'jsonwebtoken';
import { jwt_secret } from "../config.js";

export const generateAccessToken = async (e, remember) => {
    try{
        const expiration = remember ? '7d' : '1h';

        const payload = {email: e};

        const token = jwt.sign(payload, jwt_secret, {
            expiresIn: expiration,
            algorithm: 'HS256' 
        });
    
        return token;
    }catch(e){
        console.error(`Error in generating Token : ${e}`);
        return false;
    }
}