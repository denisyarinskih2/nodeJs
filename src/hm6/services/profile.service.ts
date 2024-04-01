import { Cart, Order } from "../models";
import dataBase from "../repositories/db.repository";
import { calculateTotal } from "./helpers";
import { getProductDetails } from "./product.service";
const { v4: uuidv4 } = require("uuid");

export function getOrCreateUserCart(userId: string): Cart {
  const existingCart = dataBase.carts.find(
    (cart) => cart.userId === userId && !cart.isDeleted
  );

  if (existingCart) {
    return existingCart;
  }

  const newCart: Cart = {
    id: uuidv4(),
    userId: userId,
    isDeleted: false,
    items: [],
  };

  dataBase.carts.push(newCart);

  return newCart;
}

export function updateExistedUserCart(
  productId: string,
  count: number,
  userId: string
): Cart {
  const userCartIndex = dataBase.carts.findIndex((c) => c.userId === userId);
  if (userCartIndex === -1) {
    throw new Error("User cart not found");
  }

  const updatedCart: Cart = { ...dataBase.carts[userCartIndex] };

  const existingItemIndex = updatedCart.items.findIndex(
    (item) => item.product.id === productId
  );

  if (existingItemIndex !== -1) {
    updatedCart.items[existingItemIndex].count = count;
  } else {
    updatedCart.items.push({ product: getProductDetails(productId)!, count });
  }

  dataBase.carts[userCartIndex] = updatedCart;

  return updatedCart;
}

export function deleteUserCart(userId: string): boolean {
  const cartIndex = dataBase.carts.findIndex((cart) => cart.userId === userId);

  if (cartIndex === -1) {
    return false;
  }

  dataBase.carts.splice(cartIndex, 1);
  return true;
}

export function createNewOrder(
  orderData: Partial<Order>,
  userId: string
): Order {
  const total = calculateTotal(orderData.items || []);

  const order: Order = {
    id: uuidv4(),
    userId: userId,
    cartId: orderData.cartId || "",
    items: orderData.items || [],
    payment: orderData.payment || { type: "" },
    delivery: orderData.delivery || { type: "", address: {} },
    comments: orderData.comments || "",
    status: "created",
    total: total,
  };

  dataBase.orders.push(order);

  return order;
}
