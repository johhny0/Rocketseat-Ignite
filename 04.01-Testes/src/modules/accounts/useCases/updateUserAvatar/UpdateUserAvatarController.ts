import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const avatar_file = request.file?.filename as string;

        const service = container.resolve(UpdateUserAvatarUseCase);

        try {
            await service.execute({ user_id, avatar_file });
            return response.status(200).send();
        } catch (e) {
            return response.status(400).json({ error: (e as Error).message });
        }
    }
}
