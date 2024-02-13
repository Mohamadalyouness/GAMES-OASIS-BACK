import mongoose from 'mongoose';
import User from './UserModel.js';

const CommunitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
}, { timestamps: true });

CommunitySchema.pre('find', function(next) {
  this.populate('createdBy'); 
  next();
});

const Community = mongoose.model('Community', CommunitySchema);
export default Community;
