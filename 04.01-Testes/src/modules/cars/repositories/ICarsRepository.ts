import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListCarDTO } from "../dtos/IListCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
    create(categoryDTO: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(plate: string): Promise<Car | undefined>;
    findAvailable(listCarDTO: IListCarDTO): Promise<Car[]>;
    findById(id: string): Promise<Car | undefined>;
}
