import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async create(categoryDTO: ICreateCategoryDTO): Promise<Category> {
        const categoriy = new Category();

        Object.assign(categoriy, categoryDTO);

        this.categories.push(categoriy);

        return categoriy;
    }

    async findByName(name: string): Promise<Category | undefined> {
        return this.categories.find((c) => c.name === name);
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }
}
