import { Request, Response } from "express";
import { getListOfProducts, getProductDetails } from "../services";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = { data: await getListOfProducts(), error: null };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const result = { data: await getProductDetails(productId), error: null };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
