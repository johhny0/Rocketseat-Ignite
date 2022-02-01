import { inject, injectable } from "tsyringe";

import { AppError } from "@app/shared/errors/AppError";

import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carRepository: ICarsRepository
    ) {}
    async execute(request: IRequest): Promise<void> {
        const car = await this.carRepository.findById(request.car_id);

        if (!car) {
            throw new AppError("Car does not exists!");
        }
    }
}
