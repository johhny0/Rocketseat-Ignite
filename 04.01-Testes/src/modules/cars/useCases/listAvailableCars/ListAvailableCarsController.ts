import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListCarDTO } from "../../dtos/IListCarDTO";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const service = container.resolve(ListAvailableCarsUseCase);
        const { name, category_id, brand } = request.query;
        const listCarDTO = {
            name,
            category_id,
            brand,
        } as IListCarDTO;

        try {
            const list = await service.execute(listCarDTO);
            return response.status(201).json(list);
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
