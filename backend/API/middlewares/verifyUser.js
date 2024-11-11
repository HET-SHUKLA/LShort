import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config.js';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
        return res.status(401).json({ message: 'Unauthorized or token expired' });
        }

        req.useremail = decoded.email;
        next(); 
    });
};
  
  export default verifyToken;