import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@app/modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../../../repositories/ICarsRepository";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    create({ name, description }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            description,
            name,
        });

        return this.repository.save(car);
    }

    async list(): Promise<Car[]> {
        return this.repository.find();
    }

    findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        return this.repository.findOne({ license_plate });
    }
}
