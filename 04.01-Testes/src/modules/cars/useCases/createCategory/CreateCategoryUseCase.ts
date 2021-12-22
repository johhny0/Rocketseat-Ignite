import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

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
