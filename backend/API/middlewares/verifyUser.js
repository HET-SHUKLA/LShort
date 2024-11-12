import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config.js';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        next();
        return;
    }
    
    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            next(err);
            return;
        }

        req.useremail = decoded.email;
        next();
    });
};
  
export default verifyToken;