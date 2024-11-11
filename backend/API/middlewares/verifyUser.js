// import jwt from 'jsonwebtoken';
// import { jwt_secret } from '../config.js';

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
  
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }
  
//     jwt.verify(token, jwt_secret, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Unauthorized or token expired' });
//       }
  
//       req.user = decoded; // Attach user info from the token payload
//       next(); // Move to the next middleware or route handler
//     });
//   };
  
//   export default verifyToken;