import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@app/modules/cars/dtos/ICreateCarDTO";
import { IListCarDTO } from "@app/modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../../../repositories/ICarsRepository";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    create(createCarDTO: ICreateCarDTO): Promise<Car> {
        const car: Car = this.repository.create(createCarDTO);

        return this.repository.save(car);
    }

    async findAvailable(listCarDTO: IListCarDTO): Promise<Car[]> {
        return this.repository.find({
            where: {
                ...listCarDTO,
                available: true,
            },
        });
    }

    findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        return this.repository.findOne({ license_plate });
    }
}
