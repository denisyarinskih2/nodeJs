import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  role: string;
}

const userSchema: Schema = new Schema({
  email: { type: String },
  password: { type: String },
  role: { type: String },
});

export const User = mongoose.model<UserDocument>("User", userSchema);
