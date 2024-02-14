// controllers/ProductController.js
import Community from "../Models/CommunityModel.js";
import UserModel from "../Models/UserModel.js";
// import ChatMessage from '../Models/ChatModel.js';
export const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;

    // Check if user ID is available in cookies
    const userId = req.cookies.userId;
    if (!userId) {
      return res.status(403).json({ error: "Please sign up or sign in if you have an account" });
    }

    // Find the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is already registered
    if (user.role === "unregistered") {
      return res.status(403).json({ error: "Please sign up or sign in if you have an account" });
    }

    // Find the community by ID
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Check if the user is already a member of the community
    if (community.members.includes(userId)) {
      return res.status(400).json({ error: "User is already a member of this community" });
    }

    // Set the createdBy field if it's not already set
    if (!community.createdBy) {
      community.createdBy = userId;
    }

    // Add the user to the members array of the community
    community.members.push(userId);

    await community.save();

    res.json({ message: "User joined the community successfully", community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createCommunity = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if user is admin
    if (req.userRole !== "admin") {
      return res.status(403).json({ error: "Only admins can create Community" });
    }

    // Proceed with community creation
    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      return res.status(400).json({ error: "Community with this name already exists" });
    }
    
    // Fetch the user by id from the token payload
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the community
    const { description } = req.body;
    const images = req.file.path;
    const community = await Community.create({
      name,
      description,
      createdBy: user._id, 
      images,
    });
    res.status(201).json({ messages: "Community created", community });
  } catch (error) {
    // Log and handle any errors
    console.error("Error creating community:", error);
    res.status(500).json({ error: "An error occurred while creating the community" });
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
  // Check if user is admin
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Only admins can update Community" });
  }

  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    res.json({ message: "Community updated", community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCommunity = async (req, res) => {
  // Check if user is admin
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Only admins can delete Community" });
  }

  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
      // Delete the chat messages connected to the community
      // await ChatMessage.deleteMany({ community: req.params.id });

    res.json({ message: "Community deleted", community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

