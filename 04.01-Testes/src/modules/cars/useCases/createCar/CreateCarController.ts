import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const service = container.resolve(CreateCarUseCase);

        try {
            const obj = await service.execute({ name, description });
            return response.status(201).json(obj);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
