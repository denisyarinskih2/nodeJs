import { Request, Response } from "express";
import {
  createNewOrder,
  deleteUserCart,
  getOrCreateUserCart,
  updateExistedUserCart,
} from "../services";

export const getProfileCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const result = {
      data: { cart: await getOrCreateUserCart(userId) },
      error: null,
    };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const result = {
      data: { order: await createNewOrder(req.body, userId) },
      error: null,
    };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProfileCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { productId, count } = req.body;
    const result = {
      data: { cart: await updateExistedUserCart(productId, count, userId) },
      error: null,
    };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProfileCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const result = await deleteUserCart(userId);
    let response;
    if (result) {
      response = {
        data: {
          success: true,
        },
        error: null,
      };
      res.status(200).send(response);
    } else {
      response = {
        data: {
          success: false,
        },
        error: `Cart with such id doesn't exist`,
      };
      res.status(400).send(response);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
