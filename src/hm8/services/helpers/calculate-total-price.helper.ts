import { CartItem } from "../../models";

export function calculateTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.product!.price * item.count,
    0
  );
}
