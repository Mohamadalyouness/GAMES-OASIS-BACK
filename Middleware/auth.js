import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(403).json({ error: 'Please Sign in with the right role' });
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = payload.id;
        req.userRole = payload.role;

        // Set the userRole in the cookies
        res.cookie('userRole', payload.role, { httpOnly: false });
        res.cookie('userId', payload.id, { httpOnly: false });

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
