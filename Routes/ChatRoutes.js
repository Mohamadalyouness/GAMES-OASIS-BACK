import express from 'express';
import * as ChatControllers from '../Controllers/ChatController.js';

const router = express.Router();

// Create a new chat message
router.post('/:communityId', ChatControllers.createChatMessage);

// Get a specific chat message by its ID
router.get('/:communityId', ChatControllers.getChatMessageById);

// Update a chat message by its ID
router.patch('/:id', ChatControllers.updateChatMessage);

// Delete a chat message by its ID
router.delete('/:id', ChatControllers.deleteChatMessage);

export default router;
