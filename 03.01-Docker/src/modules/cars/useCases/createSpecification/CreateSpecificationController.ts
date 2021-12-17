import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
    constructor(private service: CreateSpecificationUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        try {
            const specifications = await this.service.execute({
                name,
                description,
            });

            return response.json(specifications);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
