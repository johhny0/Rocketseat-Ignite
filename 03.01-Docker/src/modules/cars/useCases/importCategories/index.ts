import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export default (): ImportCategoriesController => {
    const repository = new CategoriesRepository();

    const useCase = new ImportCategoriesUseCase(repository);

    return new ImportCategoriesController(useCase);
};
