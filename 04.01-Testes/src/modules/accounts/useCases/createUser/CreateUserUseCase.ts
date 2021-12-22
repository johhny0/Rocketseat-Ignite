import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ) {}

    async execute(createUserDto: ICreateUserDTO): Promise<User> {
        const password = await hash(createUserDto.password, 8);

        if (await this.repository.findByEmail(createUserDto.email)) {
            throw new AppError("User Already Exists");
        }

        return this.repository.create({ ...createUserDto, password });
    }
}
