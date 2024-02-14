import mongoose from 'mongoose';
import User from './UserModel.js';
import Community from './CommunityModel.js';

const ChatMessageSchema = new mongoose.Schema(
    {
      message: { type: String, required: true },
      senderId : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' }
    },
    { timestamps: true }
  );
  
  ChatMessageSchema.pre('find', function (next) {
    this.populate({
      path: 'senderId',
      select: 'username'
    });
    this.populate({
      path: 'community',
      select: 'name'
    });
    next();
  });


const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
export default ChatMessage;
