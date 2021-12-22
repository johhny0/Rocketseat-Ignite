import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

export interface ICategoryRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private repository: ICategoriesRepository
    ) {}

    async execute({ name, description }: ICategoryRequest): Promise<Category> {
        const categoryAlreadyExists = await this.repository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category Already Exists");
        }

        return this.repository.create({ name, description });
    }
}
