import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface ISpecificationRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private repository: ISpecificationsRepository
    ) {}

    async execute(
        specificationRequest: ISpecificationRequest
    ): Promise<Specification> {
        const specificationAlreadyExists = await this.repository.findByName(
            specificationRequest.name
        );

        if (specificationAlreadyExists) {
            throw new Error("Specification Already Exists");
        }

        return this.repository.create(specificationRequest);
    }
}
