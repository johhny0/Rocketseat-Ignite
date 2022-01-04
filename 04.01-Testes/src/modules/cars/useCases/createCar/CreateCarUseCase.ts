import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";

@injectable()
export class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private repository: ICarsRepository
    ) {}

    async execute(carRequest: ICreateCarDTO): Promise<Car> {
        const carAlreadyExists = await this.repository.findByLicensePlate(
            carRequest.license_plate
        );

        if (carAlreadyExists) {
            throw new AppError("Car Already Exists");
        }

        return this.repository.create(carRequest);
    }
}
