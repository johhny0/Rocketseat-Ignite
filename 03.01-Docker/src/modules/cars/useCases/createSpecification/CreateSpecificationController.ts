import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const service = container.resolve(CreateSpecificationUseCase);

        try {
            const specifications = await service.execute({
                name,
                description,
            });

            return response.json(specifications);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
