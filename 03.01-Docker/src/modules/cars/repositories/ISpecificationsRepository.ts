import { Specification } from "../entities/Specification";

export interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

export interface ISpecificationsRepository {
    create(specificationDTO: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification | undefined>;
    list(): Promise<Specification[]>;
}
