import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
    constructor(private service: ListCategoriesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const categories = await this.service.execute();
            return response.status(201).json(categories);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
