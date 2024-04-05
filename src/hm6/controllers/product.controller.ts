import { Request, Response } from "express";
import { getListOfProducts, getProductDetails } from "../services";

export const getProducts = (req: Request, res: Response): void => {
  try {
    const result = { data: getListOfProducts(), error: null };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductById = (req: Request, res: Response): void => {
  try {
    const { productId } = req.params;
    const result = { data: getProductDetails(productId), error: null };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
