import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import {
    CreateCategoryUseCase,
    ICategoryRequest,
} from "./CreateCategoryUseCase";

describe("[CreateCategoryUseCase]", () => {
    let createCategoryUseCase: CreateCategoryUseCase;
    let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const category: ICategoryRequest = {
            name: "name",
            description: "description",
        };

        const createdCategory = await createCategoryUseCase.execute(category);

        expect(createdCategory).toHaveProperty("id");
    });

    it("Should not be able to create a new category with same name", async () => {
        expect(async () => {
            const category: ICategoryRequest = {
                name: "name",
                description: "description",
            };

            await createCategoryUseCase.execute(category);
            await createCategoryUseCase.execute(category);
        }).rejects.toBeInstanceOf(AppError);
    });
});
