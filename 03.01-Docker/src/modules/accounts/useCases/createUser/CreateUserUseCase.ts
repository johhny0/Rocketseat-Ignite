import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
