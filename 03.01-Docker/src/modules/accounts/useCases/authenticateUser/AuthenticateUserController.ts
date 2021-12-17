import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const service = container.resolve(AuthenticateUserUseCase);

        try {
            const authenticateInfo = await service.execute({ email, password });
            return response.status(201).json(authenticateInfo);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
