import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private repository: ICategoriesRepository
    ) {}

    execute(): Promise<Category[]> {
        return this.repository.list();
    }
}
