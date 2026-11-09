import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

export function verifyUserAuthorization(rule: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user || !rule.includes(request.user?.role)) {
      throw new AppError("Unauthorized", 401);
    }

    next();
  };
}
