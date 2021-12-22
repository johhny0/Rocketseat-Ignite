import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(ListCategoriesUseCase);
        try {
            const categories = await service.execute();
            return response.status(201).json(categories);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
