import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private repository: ISpecificationsRepository
    ) {}

    execute(): Promise<Specification[]> {
        return this.repository.list();
    }
}
