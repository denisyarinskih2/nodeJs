import { CartItem } from "./cart.interface";

type ORDER_STATUS = "created" | "completed";

export interface Order {
  userId: string;
  cartId: string;
  items: CartItem[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

export interface Delivery {
  type: string;
  address?: any;
}

export interface Payment extends Delivery {
  creditCard?: any;
}

import mongoose, { Schema, Document } from "mongoose";

export interface OrderDocument extends Document {
  user: string;
  cart: string;
  items: CartItem[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const orderSchema: Schema = new Schema({
  user: { type: String },
  cart: { type: String },
  items: { type: Array<CartItem> },
  payment: { type: Object },
  delivery: { type: Object },
  comments: { type: String },
  status: { type: String },
  total: { type: Number },
});

export const Order = mongoose.model<OrderDocument>("Order", orderSchema);
