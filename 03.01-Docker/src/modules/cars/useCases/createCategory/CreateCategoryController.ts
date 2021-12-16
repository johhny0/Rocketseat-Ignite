import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
    constructor(private service: CreateCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        try {
            const category = this.service.execute({ name, description });
            return response.status(201).json(category);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
