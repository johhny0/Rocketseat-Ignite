import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./ListCarsUseCase";

export class ListCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(ListCarsUseCase);

        try {
            const list = await service.execute({});
            return response.status(201).json(list);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
