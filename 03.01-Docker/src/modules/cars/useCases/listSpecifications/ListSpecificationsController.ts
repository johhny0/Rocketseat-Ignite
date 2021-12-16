import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
    constructor(private service: ListSpecificationsUseCase) {}

    handle(request: Request, response: Response): Response {
        try {
            const categories = this.service.execute();
            return response.status(201).json(categories);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
