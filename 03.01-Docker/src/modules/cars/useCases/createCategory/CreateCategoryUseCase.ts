import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICategoryRequest {
    name: string;
    description: string;
}

export class CreateCategoryUseCase {
    constructor(private repository: ICategoriesRepository) {}

    async execute({ name, description }: ICategoryRequest): Promise<Category> {
        const categoryAlreadyExists = await this.repository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category Already Exists");
        }

        return this.repository.create({ name, description });
    }
}
