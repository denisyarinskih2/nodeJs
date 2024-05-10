import Joi from "joi";
import { checkAuthorization } from "./helpers/check-authorization.helper";
import { NextFunction, Request, Response } from "express";

export async function authValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.headers["x-user-id"] as string;
  const userRole = req.headers["role"] as string;

  // if (userRole !== "admin") {
  //   return res.status(403).json({
  //     data: null,
  //     error: { message: "You must be an authorized user" },
  //   });
  // }

  const isUserAuthorized = await checkAuthorization(userId);

  if (!isUserAuthorized) {
    return res.status(401).json({
      data: null,
      error: { message: "User is not authorized" },
    });
  }

  next();
}
