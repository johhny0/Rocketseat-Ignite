import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(ListSpecificationsUseCase);

        try {
            const categories = await service.execute();
            return response.status(201).json(categories);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
