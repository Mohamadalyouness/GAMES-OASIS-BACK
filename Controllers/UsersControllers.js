import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
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
    res.cookie("userRole", user.role, { httpOnly: false });
    res.cookie("userId", user.id, { httpOnly: false });

    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
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
};

export const getUsers = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userRole = req.cookies.userRole;

    // Check if token and userRole exist
    if (!token || !userRole) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (decodedToken.role === "admin") {
        User.find()
          .then((users) => {
            res.json(users);
          })
          .catch((error) => {
            res.status(500).json({ error: error.message });
          });
      } else {
        // User is not authorized
        res.status(403).json({ error: "Access denied" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const token = req.cookies.jwt;
  
      // Check if token exists
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      // Verify the token
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }
  
        // Check if userRole is "admin"
        if (decodedToken.role === "admin") {
          // User is authorized, proceed with fetching the user by ID
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          res.json(user);
        } else {
          // User is not authorized
          res.status(403).json({ error: "Access denied" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const token = req.cookies.jwt;
  
      // Check if token exists
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      // Verify the token
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }
  
        // Check if userRole is "admin"
        if (decodedToken.role === "admin") {
          // Check if the user ID exists
          const user = await User.findById(id);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
  
          // User is authorized and the user ID exists, proceed with deleting the user
          await User.findByIdAndDelete(id);
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          // User is not authorized
          res.status(403).json({ error: "Access denied" });
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };