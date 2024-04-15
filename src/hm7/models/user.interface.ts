import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  email?: string;
}

const userSchema: Schema = new Schema({
  email: { type: String },
});

export const User = mongoose.model<UserDocument>('User', userSchema);
