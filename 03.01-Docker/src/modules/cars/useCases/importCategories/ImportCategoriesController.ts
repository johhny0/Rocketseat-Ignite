import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        const service = container.resolve(ImportCategoriesUseCase);

        try {
            if (!file) {
                return response.status(404).json({ error: "File not found" });
            }

            await service.execute(file);

            return response.status(201).send();
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
