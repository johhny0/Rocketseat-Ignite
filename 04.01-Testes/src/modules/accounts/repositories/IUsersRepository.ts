import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
    create(specificationDTO: ICreateUserDTO): Promise<User>;
    findByEmail(name: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    list(): Promise<User[]>;
}
