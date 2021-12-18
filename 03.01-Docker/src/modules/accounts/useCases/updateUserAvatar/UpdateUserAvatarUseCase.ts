import { unlink } from "fs";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.repository.findById(user_id);

        if (!user) {
            return;
        }

        if (user.avatar) {
            const fullPath = resolve(`./files/avatar/${user.avatar}`);
            unlink(fullPath, (err) => {
                if (err) throw err;
                console.log(`Deleted File: ${fullPath}`);
            });
        }

        user.avatar = avatar_file;

        await this.repository.create(user);
    }
}
