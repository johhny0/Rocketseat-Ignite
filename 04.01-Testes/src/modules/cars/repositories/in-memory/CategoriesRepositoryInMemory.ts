import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async create(categoryDTO: ICreateCategoryDTO): Promise<Category> {
        const category = new Category();

        Object.assign(category, categoryDTO);

        this.categories.push(category);

        return category;
    }

    async findByName(name: string): Promise<Category | undefined> {
        return this.categories.find((c) => c.name === name);
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }
}
