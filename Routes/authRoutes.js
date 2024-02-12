// routes/auth.js
import User from '../Models/UserModel.js';
import jwt from "jsonwebtoken"
import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {
 try {
    const { username, password, role , email , gamingName } = req.body;
    const user = new User({ username, password, role, email, gamingName });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
});

router.post('/login', async (req, res) => {
 try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })
    res.json({ role: user.role });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
});

export default router;
