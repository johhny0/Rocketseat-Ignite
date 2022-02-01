import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { IListCarDTO } from "../../dtos/IListCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";

@injectable()
export class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private repository: ICarsRepository
    ) {}

    execute(listCarDTO: IListCarDTO): Promise<Car[]> {
        return this.repository.findAvailable(listCarDTO);
    }
}
