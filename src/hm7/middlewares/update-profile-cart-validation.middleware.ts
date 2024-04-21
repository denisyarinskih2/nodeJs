import Joi from "joi";
import { NextFunction, Request, Response } from "express";

export function updateProfileCartValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bodySchema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().integer().min(1).required(),
  });

  const bodyValidation = bodySchema.validate(req.body);

  if (bodyValidation.error) {
    return res.status(400).json({
      data: null,
      error: { message: "Products are not valid" },
    });
  }

  next();
}
