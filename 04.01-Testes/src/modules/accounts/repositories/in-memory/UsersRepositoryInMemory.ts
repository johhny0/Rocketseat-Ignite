import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
    private users: User[] = [];

    async create(userDTO: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, userDTO);

        this.users.push(user);

        return user;
    }
    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find((u) => u.email === email);
    }
    async findById(id: string): Promise<User | undefined> {
        return this.users.find((u) => u.id === id);
    }
    async list(): Promise<User[]> {
        return this.users;
    }
}
