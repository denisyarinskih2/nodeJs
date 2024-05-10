import { Product } from "../models";
// import { getRepository } from "typeorm";
import AppDataSource from "../data-source.config";

export async function getListOfProducts(): Promise<Product[]> {
  try {
    // const productRepository = getRepository(Product);
    const products = await AppDataSource.manager.find(Product);
    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getProductDetails(productId: string): Promise<Product | null> {
  try {
    // // const productRepository = getRepository(Product);
    const product = await AppDataSource.manager.findOne(Product, { where: { id: productId } });
    return product || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}