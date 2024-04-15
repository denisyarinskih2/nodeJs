import { Product, ProductDocument } from "../models";

export async function getListOfProducts(): Promise<ProductDocument[]> {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getProductDetails(
  productId: string
): Promise<ProductDocument | null> {
  try {
    const product = await Product.findOne({ _id: productId });
    return product ? product : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
