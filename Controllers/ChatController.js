import ChatMessage from "../Models/ChatModel.js";
import UserModel from "../Models/UserModel.js";
import Community from "../Models/CommunityModel.js";
// Controller function to create a new chat message
export const createChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.cookies.userId;

    // Check if userId is available
    if (!userId) {
      return res.status(401).json({ error: 'your are not signed in' });
    }

    // Retrieve the community ID from the route parameter
    const { communityId } = req.params;

    // Create a new chat message
    const chatMessage = new ChatMessage({
      message,
      senderId: userId,
      community: communityId
    });

    // Save the chat message
    await chatMessage.save();

    return res.status(201).json(chatMessage);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Controller function to get a specific chat message by its ID
export const getChatMessageById = async (req, res) => {
  try {
    const { communityId  } = req.params;
    const chatMessages = await ChatMessage.find({ community: communityId });
    if (!chatMessages)
      return res.status(404).json({ error: "Chat message not found" });
    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a chat message by its ID
export const updateChatMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, sendby, community } = req.body;
    const updatedChatMessage = await ChatMessage.findByIdAndUpdate(
      id,
      { message, sendby, community },
      { new: true }
    );
    if (!updatedChatMessage)
      return res.status(404).json({ message: "Chat message not found" });
    res.status(200).json(updatedChatMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a chat message by its ID
export const deleteChatMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChatMessage = await ChatMessage.findByIdAndDelete(id);
    if (!deletedChatMessage)
      return res.status(404).json({ message: "Chat message not found" });
    res.status(200).json({ message: "Chat message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
