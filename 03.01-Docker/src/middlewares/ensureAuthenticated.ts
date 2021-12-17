import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization as string;

    try {
        if (!authHeader) {
            throw new AppError("Token is missing", 401);
        }

        const [, token] = authHeader.split(" ");

        const { sub } = verify(
            token,
            process.env.JWT_KEY as string
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(sub);

        if (!user) {
            throw new AppError("User does not exists", 401);
        }

        next();
    } catch (error) {
        throw new AppError("Invalid Token", 401);
    }
}
