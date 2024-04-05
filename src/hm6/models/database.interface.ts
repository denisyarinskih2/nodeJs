import { Cart } from "./cart.interface";
import { Order } from "./order.models";
import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Database {
  users: User[];
  carts: Cart[];
  orders: Order[];
  products: Product[];
}
