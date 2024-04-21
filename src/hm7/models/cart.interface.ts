import { Product, ProductDocument } from "./product.interface";

export interface CartItem {
  product: ProductDocument | null;
  count: number;
}

import mongoose, { Schema, Document } from "mongoose";

export interface CartDocument extends Document {
  user: string;
  isDeleted: boolean;
  items: CartItem[];
}

const cartSchema: Schema = new Schema({
  user: { type: String },
  isDeleted: { type: Boolean },
  items: { type: Array<CartItem> },
});

export const Cart = mongoose.model<CartDocument>("Cart", cartSchema);
