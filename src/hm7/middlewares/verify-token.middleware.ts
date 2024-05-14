import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token is required");
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    return res.status(403).send("Invalid Token");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
