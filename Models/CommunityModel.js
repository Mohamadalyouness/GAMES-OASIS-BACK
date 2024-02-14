import mongoose from 'mongoose';
import User from './UserModel.js';

const CommunitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

CommunitySchema.pre('find', function(next) {
  this.populate({
    path: 'createdBy',
    select: 'username email role'
  });
  this.populate({
    path: 'members',
    select: 'username email role'
  });
  next();
});


const Community = mongoose.model('Community', CommunitySchema);
export default Community;
