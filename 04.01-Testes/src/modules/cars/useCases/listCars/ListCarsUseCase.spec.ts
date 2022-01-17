import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

describe("List Cars", () => {
    let listCarsUseCase: ListCarsUseCase;
    let carsRepository: ICarsRepository;

    beforeAll(() => {
        carsRepository = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepository);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepository.create({
            license_plate: "TEST 1234",
            name: "Test",
            description: "Description test",
            brand: "Brand",
            category_id: "",
            daily_rate: 5,
            fine_amount: 0.5,
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepository.create({
            license_plate: "TEST 1234",
            name: "Test",
            description: "Description test",
            brand: "Brand Test",
            category_id: "",
            daily_rate: 5,
            fine_amount: 0.5,
        });

        await carsRepository.create({
            license_plate: "TEST 1234",
            name: "Test",
            description: "Description test",
            brand: "Brand Test2",
            category_id: "",
            daily_rate: 5,
            fine_amount: 0.5,
        });

        const cars = await listCarsUseCase.execute({
            brand: "Brand Test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepository.create({
            license_plate: "TEST 1234",
            name: "Test1",
            description: "Description test",
            brand: "Brand Test",
            category_id: "",
            daily_rate: 5,
            fine_amount: 0.5,
        });

        await carsRepository.create({
            license_plate: "TEST 1234",
            name: "Test2",
            description: "Description test",
            brand: "Brand Test",
            category_id: "",
            daily_rate: 5,
            fine_amount: 0.5,
        });

        const cars = await listCarsUseCase.execute({
            name: "Test1",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepository.create({
            license_plate: "TEST 1234",
            name: "Test1",
            description: "Description test",
            brand: "Brand Test",
            category_id: "13245",
            daily_rate: 5,
            fine_amount: 0.5,
        });

        await carsRepository.create({
            license_plate: "TEST 1234",
            name: "Test2",
            description: "Description test",
            brand: "Brand Test",
            category_id: "6789",
            daily_rate: 5,
            fine_amount: 0.5,
        });

        const cars = await listCarsUseCase.execute({
            category_id: "13245",
        });

        expect(cars).toEqual([car]);
    });
});
