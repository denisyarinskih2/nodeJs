import { Product } from "../models";
import dataBase from "../repositories/db.repository";

export function getListOfProducts(): Product[] {
return dataBase.products;
}

export function getProductDetails(productId: string): Product | null {
  const product = dataBase.products.find((product) => product.id === productId);
  return product ? product : null;
}
