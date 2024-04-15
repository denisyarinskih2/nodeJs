import { Cart, CartDocument, CartItem, Order, OrderDocument } from "../models";
import { calculateTotal } from "./helpers";
import { getProductDetails } from "./product.service";

export async function getOrCreateUserCart(
  userId: string
): Promise<CartDocument> {
  const existingCart = await Cart.findOne({ user: userId });

  if (existingCart) {
    return existingCart;
  }

  const newCart = {
    user: userId,
    isDeleted: false,
    items: [] as CartItem[],
  };

  try {
    const result = await Cart.create(newCart);

    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Custom error");
  }
}

export async function updateExistedUserCart(
  productId: string,
  count: number,
  userId: string
): Promise<CartDocument> {
  const userCart = await Cart.findOne({ user: userId });
  if (!userCart) {
    throw new Error("User cart not found");
  }

  const userCartObject = userCart.toObject();

  const existingItemIndex = userCartObject.items.findIndex(
    (item) => item.product?.id === productId
  );

  if (existingItemIndex !== -1) {
    userCartObject.items[existingItemIndex].count = count;
  } else {
    userCartObject.items.push({
      product: await getProductDetails(productId)!,
      count,
    });
  }

  await userCartObject.save();

  return userCartObject;
}

export async function deleteUserCart(userId: string): Promise<boolean> {
  try {
    const result = await Cart.deleteOne({ user: userId });

    if (result.deletedCount === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting user cart:", error);
    return false;
  }
}

export async function createNewOrder(
  orderData: Partial<OrderDocument>,
  userId: string
): Promise<OrderDocument> {
  const total = calculateTotal(orderData.items || []);

  const order = {
    user: userId,
    cart: orderData.cart || "",
    items: orderData.items || [],
    payment: orderData.payment || { type: "" },
    delivery: orderData.delivery || { type: "", address: {} },
    comments: orderData.comments || "",
    status: "created",
    total: total,
  };

  try {
    const result = Order.create(order);

    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Custom error");
  }
}
