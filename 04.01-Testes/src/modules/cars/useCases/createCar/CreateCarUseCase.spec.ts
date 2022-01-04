import { AppError } from "@app/shared/errors/AppError";

import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create Car", () => {
    let createCarUseCase: CreateCarUseCase;

    beforeEach(() => {
        createCarUseCase = new CreateCarUseCase(new CarsRepositoryInMemory());
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Name Brand",
            category_id: "1234",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Name Brand",
            category_id: "1234",
        });

        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Name Brand",
                category_id: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should  be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Name Brand",
            category_id: "1234",
        });

        expect(car.available).toBe(true);
    });
});
