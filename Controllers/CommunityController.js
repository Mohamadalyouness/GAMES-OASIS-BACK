// controllers/ProductController.js
import Community from "../Models/CommunityModel.js";
import UserModel from "../Models/UserModel.js";
export const createCommunity = async (req, res) => {
  const { email, name } = req.body;
  const user = await UserModel.findOne({ email });
  const createdBy = await UserModel.findOne({ email });
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Only admins can create Community" });
  }

  try {
    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      return res.status(400).json({ error: "Community with this name already exists" });
    }
    const {  description } = req.body;
    const images = req.file.path;
    const community = await Community.create({
      name,
      description,
      createdBy,
      images
    });
    res.status(201).json({ message: "Community created", community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find({});
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCommunity = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Only admins can update Community" });
  }

  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!community) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "community updated", community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCommunity = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Only admins can delete Community" });
  }

  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    res.json({ message: "Community deleted", community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }  
};
