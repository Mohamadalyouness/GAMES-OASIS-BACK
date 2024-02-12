// controllers/ProductController.js
import Community from "../Models/CommunityModel.js"
import UserModel from "../Models/UserModel.js"
export const createCommunity = async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne( { email });
   console.log ( user )
if ( user.role !== 'admin') {
       return res.status(403).json({ error: 'Only admins can create products' });
    }
   
 try {
    const { name,description } = req.body;
    // const images = req.file.path;
    const community = await Community.create({
        name,
        description,
      

    });
    res.status(201).json({ message: 'Community created', community });
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
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(community);
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};

export const updateCommunity = async (req, res) => {
    const { userRole } = req; // Get the user role from the request

    if (userRole !== 'admin') {
       return res.status(403).json({ error: 'Only admins can create products' });
    }
   
 try {
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!community) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'community updated', community });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};

export const deleteCommunity = async (req, res) => {
    const { userRole } = req; // Get the user role from the request

    if (userRole !== 'admin') {
       return res.status(403).json({ error: 'Only admins can create communities' });
    }
   
 try {
    const community = await Community.findByIdAndRemove(req.params.id);
    if (!community) {
      return res.status(404).json({ error: 'community not found' });
    }
    res.json({ message: 'community deleted', community });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};
