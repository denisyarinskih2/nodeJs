import { getRepository } from "typeorm";
import { Cart, CartItem, ORDER_STATUS, Order } from "../models";
import { calculateTotal } from "./helpers";
import { getProductDetails } from "./product.service";
// import AppDataSource from "../server";

export async function getOrCreateUserCart(userId: string): Promise<Cart> {
  const cartRepository = getRepository(Cart);
  const existingCart = await cartRepository.findOne({
    where: { user: userId },
  });

  if (existingCart) {
    const existingCartWithItems = await cartRepository
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.items", "items")
      .leftJoinAndSelect("items.product", "product")
      .where("cart.id = :cartId", { cartId: existingCart.id })
      .getOne();
    return existingCartWithItems!;
  }

  const newCart = {
    user: userId,
    isDeleted: false,
    items: [],
  };

  try {
    const result = await cartRepository.save(newCart);

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
): Promise<Cart> {
  const cartRepository = getRepository(Cart);
  const userCart = await cartRepository.findOne({
    where: { user: userId },
    relations: ["items", "items.product"],
  });
  if (!userCart) {
    throw new Error("User cart not found");
  }

  const userCartObject = userCart;

  const existingItemIndex = userCartObject.items.findIndex(
    (item) => item.product?.id === productId
  );

  if (existingItemIndex !== -1) {
    userCartObject.items[existingItemIndex].count = count;
  } else {
    const newCartItem = new CartItem();
    newCartItem.product = await getProductDetails(productId);
    newCartItem.count = count;

    userCart.items.push(newCartItem);
  }

  await userCartObject.save();

  return userCartObject;
}

export async function deleteUserCart(userId: string): Promise<boolean> {
  try {
    const cartRepository = getRepository(Cart);
    const result = await cartRepository.delete({ user: userId });

    if (result.affected === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting user cart:", error);
    return false;
  }
}

export async function createNewOrder(
  orderData: Partial<Order>,
  userId: string
): Promise<Order> {
  const total = calculateTotal(orderData.items || []);

  const order = {
    user: userId,
    cartId: orderData.cartId || "",
    items: orderData.items || [],
    payment: orderData.payment || { type: "" },
    delivery: orderData.delivery || { type: "", address: {} },
    comments: orderData.comments || "",
    status: "created" as ORDER_STATUS,
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
