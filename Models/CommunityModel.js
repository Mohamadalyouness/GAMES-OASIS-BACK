import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], 
}, { timestamps: true });

CommunitySchema.pre('find', function(next) {
  this.populate('UserModel');
  next();
});

// Create and export the Product model
const Community = mongoose.model('Community', CommunitySchema);
export default Community;