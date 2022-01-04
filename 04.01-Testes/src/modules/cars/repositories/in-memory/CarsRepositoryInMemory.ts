import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create(carDTO: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, carDTO);

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        return this.cars.find((c) => c.license_plate === license_plate);
    }

    async list(): Promise<Car[]> {
        return this.cars;
    }
}
