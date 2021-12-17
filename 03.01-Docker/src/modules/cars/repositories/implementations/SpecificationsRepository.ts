import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create(
        specificationDTO: ICreateSpecificationDTO
    ): Promise<Specification> {
        const specification = this.repository.create(specificationDTO);

        await this.repository.save(specification);

        return specification;
    }

    findByName(name: string): Promise<Specification | undefined> {
        return this.repository.findOne({ name });
    }

    list(): Promise<Specification[]> {
        return this.repository.find();
    }
}
