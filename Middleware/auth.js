import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'Please provide a valid token' });
    }
    try {
        // Remove the 'Bearer ' prefix from the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY);
        req.userId = decoded.id;
        req.userRole = decoded.role;

        // Set the userRole in the cookies
        res.cookie('userRole', decoded.role, { httpOnly: false });
        res.cookie('userId', decoded.id, { httpOnly: false });

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;

