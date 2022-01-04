import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(CreateCarUseCase);

        try {
            const obj = await service.execute(request.body as ICreateCarDTO);
            return response.status(201).json(obj);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
