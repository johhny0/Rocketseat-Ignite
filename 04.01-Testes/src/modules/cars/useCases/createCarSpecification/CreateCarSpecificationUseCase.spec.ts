import { AppError } from "@app/shared/errors/AppError";

import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

describe("Create Car Specification", () => {
    let useCase: CreateCarSpecificationUseCase;
    let carRepository: ICarsRepository;

    beforeEach(() => {
        carRepository = new CarsRepositoryInMemory();
        useCase = new CreateCarSpecificationUseCase(carRepository);
    });

    it("should be able to add a new specification to the car", async () => {
        const specifications_id = ["54321"];

        const car = await carRepository.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Name Brand",
            category_id: "1234",
        });

        await useCase.execute({ car_id: car.id, specifications_id });
    });

    it("should not be able to add a new specification to a non-existing car", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"];

        expect(async () => {
            await useCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });
});
