import { Category } from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export interface ICategoriesRepository {
    create(categoryDTO: ICreateCategoryDTO): Promise<Category>;
    findByName(name: string): Promise<Category | undefined>;
    list(): Promise<Category[]>;
}
