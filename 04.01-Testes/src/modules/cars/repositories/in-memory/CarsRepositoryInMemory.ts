import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { IListCarDTO } from "../../dtos/IListCarDTO";
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

    async findAvailable(listCarDTO: IListCarDTO): Promise<Car[]> {
        let carsAvailable = this.cars.filter((c) => c.available);

        if (listCarDTO.brand)
            carsAvailable = carsAvailable.filter(
                (c) => listCarDTO.brand === c.brand
            );

        if (listCarDTO.name)
            carsAvailable = carsAvailable.filter(
                (c) => listCarDTO.name === c.name
            );

        if (listCarDTO.category_id)
            carsAvailable = carsAvailable.filter(
                (c) =>
                    listCarDTO.category_id &&
                    listCarDTO.category_id === c.category_id
            );

        return carsAvailable;
    }

    async findById(id: string): Promise<Car | undefined> {
        return this.cars.find((c) => c.id === id);
    }
}
