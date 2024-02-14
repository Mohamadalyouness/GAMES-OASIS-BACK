// routes/auth.js
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();

// Get all users
router.get("/getUser", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get("/getUser/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, role, email, gamingName } = req.body;

    // Check if username, email, or gamingName already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { gamingName }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username, email, or gaming name already taken" });
    }

    const user = new User({ username, password, role, email, gamingName });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted succefully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
