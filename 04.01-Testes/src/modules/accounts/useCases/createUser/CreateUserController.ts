import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createUserDTO = request.body as ICreateUserDTO;

        const service = container.resolve(CreateUserUseCase);

        try {
            const user = await service.execute(createUserDTO);
            return response.status(201).json(user);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
