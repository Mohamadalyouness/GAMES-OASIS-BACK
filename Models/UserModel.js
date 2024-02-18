// UserModel.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
 username: { type: String, required: true },
 email: { type: String, required: true },
 gamingName: { type: String, required: true },
 password: { type: String, required: true },
 role: { type: String, enum: ['admin', 'registered'], default: 'registered' },
 Communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }] 
});

UserSchema.pre('save', async function (next) {
 if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
 }
 next();
});

UserSchema.methods.comparePassword = function (plaintextPassword) {
 return bcrypt.compare(plaintextPassword, this.password);
};

UserSchema.pre('find', function(next) {
   this.populate('Communities'); 
   next();
 });

const User = mongoose.model('User', UserSchema);
export default User;
