// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
 username: { type: String, required: true, unique: true },
 email: { type: String, required: true },
 gamingName: { type: String, required: true },
 password: { type: String, required: true },
 role: { type: String, enum: ['admin', 'registered', 'unregistered'], default: 'unregistered' },
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

const User = mongoose.model('User', UserSchema);
export default User;
