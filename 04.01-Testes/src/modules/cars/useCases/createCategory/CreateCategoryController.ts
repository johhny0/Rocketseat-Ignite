import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const service = container.resolve(CreateCategoryUseCase);

        try {
            const category = await service.execute({ name, description });
            return response.status(201).json(category);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}