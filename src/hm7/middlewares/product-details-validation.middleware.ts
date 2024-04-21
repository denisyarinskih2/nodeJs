import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { getProductDetails } from "../services";

export function productDetailsValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const paramsSchema = Joi.object({
    productId: Joi.string().required(),
  });

  const paramsValidation = paramsSchema.validate(req.params);

  if (paramsValidation.error) {
    return res.status(400).json({
      data: null,
      error: { message: paramsValidation.error.details[0].message },
    });
  }

  const { productId } = req.params;
  const product = getProductDetails(productId);
  if (!product) {
    return res.status(404).json({
      data: null,
      error: { message: "No product with such id" },
    });
  }

  next();
}
