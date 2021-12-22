import { getRepository, Repository } from "typeorm";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({
            description,
            name,
        });

        return this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        return this.repository.find();
    }

    findByName(name: string): Promise<Category | undefined> {
        return this.repository.findOne({ name });
    }
}
