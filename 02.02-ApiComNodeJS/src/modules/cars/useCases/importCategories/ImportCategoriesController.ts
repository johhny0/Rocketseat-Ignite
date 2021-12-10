import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
    constructor(private service: ImportCategoriesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        try {
            if (!file) {
                return response.status(404).json({ error: "File not found" });
            }

            await this.service.execute(file);

            return response.status(201).send();
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
