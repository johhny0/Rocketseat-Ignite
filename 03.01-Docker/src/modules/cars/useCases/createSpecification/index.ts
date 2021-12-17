import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export default (): CreateSpecificationController => {
    const specificationRepository = new SpecificationsRepository();

    const createSpecificationUseCase = new CreateSpecificationUseCase(
        specificationRepository
    );

    return new CreateSpecificationController(createSpecificationUseCase);
};
