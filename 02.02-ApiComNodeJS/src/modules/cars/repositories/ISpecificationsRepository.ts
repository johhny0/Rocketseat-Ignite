import { Specification } from "../models/Specification";

export interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

export interface ISpecificationsRepository {
    create(specificationDTO: ICreateSpecificationDTO): Specification;
    findByName(name: string): Specification | undefined;
    list(): Specification[];
}
