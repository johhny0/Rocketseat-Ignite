import { inject, injectable } from "tsyringe";

import { AppError } from "@app/shared/errors/AppError";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

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
            throw new AppError("Specification Already Exists");
        }

        return this.repository.create(specificationRequest);
    }
}
