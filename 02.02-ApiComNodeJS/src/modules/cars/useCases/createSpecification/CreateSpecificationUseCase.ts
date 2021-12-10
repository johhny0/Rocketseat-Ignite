import { Specification } from "../../models/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface ISpecificationRequest {
    name: string;
    description: string;
}

export class CreateSpecificationUseCase {
    constructor(private repository: ISpecificationsRepository) {}

    execute({ name, description }: ISpecificationRequest): Specification {
        const specificationAlreadyExists = this.repository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification Already Exists");
        }

        return this.repository.create({ name, description });
    }
}
