import { NextFunction, Request, Response } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const currentUser = req.body.user;
  if (currentUser.role !== "admin") {
    return res.status(401).send("Only admin can manage cart");
  }
  next();
}
