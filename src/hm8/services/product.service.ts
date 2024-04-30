import { Product } from "../models";
import { getRepository } from "typeorm";

export async function getListOfProducts(): Promise<Product[]> {
  try {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getProductDetails(productId: string): Promise<Product | null> {
  try {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id: productId } });
    return product || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}