import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

const repository = CategoriesRepository.getInstance();

const useCase = new ImportCategoriesUseCase(repository);

const controller = new ImportCategoriesController(useCase);

export { controller as importCategoriesController };
