import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";

export class UsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create(userDto: ICreateUserDTO): Promise<User> {
        const user = this.repository.create(userDto);

        return this.repository.save(user);
    }

    async list(): Promise<User[]> {
        return this.repository.find();
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.repository.findOne({ email });
    }

    findById(id: string): Promise<User | undefined> {
        return this.repository.findOne(id);
    }
}
