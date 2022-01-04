import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
    create(categoryDTO: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(plate: string): Promise<Car | undefined>;
    list(): Promise<Car[]>;
}
