import { Category } from "../models/Category";

export interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export interface ICategoriesRepository {
    create(categoryDTO: ICreateCategoryDTO): Category;
    findByName(name: string): Category | undefined;
    list(): Category[];
}
