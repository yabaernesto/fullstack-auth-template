import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

interface TokenPayload {
  role: string;
  sub: string;
}

export function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // const authHeader = request.headers.authorization?.split('Bearer ')[1]
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token nao informado!");
  }

  const [, token] = authHeader.split(" ");

  // pegar o payload
  const { sub: user_id, role } = jwt.verify(
    token,
    authConfig.jwt.secret,
  ) as TokenPayload;

  request.user = {
    id: String(user_id),
    role,
  };

  return next();
}
