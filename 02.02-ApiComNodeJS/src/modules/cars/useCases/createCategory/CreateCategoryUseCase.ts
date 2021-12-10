import { Category } from "../../models/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICategoryRequest {
    name: string;
    description: string;
}

export class CreateCategoryUseCase {
    constructor(private repository: ICategoriesRepository) {}

    execute({ name, description }: ICategoryRequest): Category {
        const categoryAlreadyExists = this.repository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category Already Exists");
        }

        return this.repository.create({ name, description });
    }
}
