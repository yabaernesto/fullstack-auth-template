import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const fakerUser = {
      id: "1",
      username: "yaba",
      password: "123456",
      role: "customer",
    };

    if (username !== fakerUser.username || password !== fakerUser.password) {
      throw new AppError("E-mail e/ou senha incorreta!", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    // criar token. estrutura do sign: (payload, secret, { data de expiração do token, subject "id" })
    const token = jwt.sign(
      {
        role: fakerUser.role,
      },
      secret,
      {
        expiresIn,
        subject: String(fakerUser.id),
      },
    );

    return response.json({ token });
  }
}

export { SessionsController };
