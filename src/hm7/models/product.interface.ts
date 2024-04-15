import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
  title: string;
  description: string;
  price: number;
}

const productSchema: Schema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
});

export const Product = mongoose.model<ProductDocument>("Product", productSchema);
