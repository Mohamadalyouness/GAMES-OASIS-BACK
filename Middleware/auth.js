// middlewares/auth.js
import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
       return res.status(403).json({ error: 'No token provided' });
    }
    try {
       const payload = jwt.verify(token, process.env.SECRET_KEY);
       req.userId = payload.id;
       req.userRole = payload.role;
       console.log('User Role:', req.userRole); 
       next();
    } catch (error) {
       res.status(401).json({ error: 'Invalid token' });
    }
   };
   
   export default authMiddleware;
   