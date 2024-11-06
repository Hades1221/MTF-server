import mongoose, { Schema, model, Document } from 'mongoose';

// ממשק למודל המשתמש
export interface IUser extends Document {
  role: string, 
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
}

// סכמה למשתמש
const userSchema = new Schema({
  role: { type: String, enum: ['Viewer', 'Admin', 'Editor'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
});

// יצירת המודל של User
const User = model<IUser>('User', userSchema);

export default User;
