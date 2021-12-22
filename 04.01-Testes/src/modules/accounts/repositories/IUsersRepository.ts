import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
    create(userDTO: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    list(): Promise<User[]>;
}
