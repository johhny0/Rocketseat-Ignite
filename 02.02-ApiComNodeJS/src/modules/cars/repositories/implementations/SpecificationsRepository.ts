import { Specification } from "../../models/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
    specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    private static INSTANCE: SpecificationsRepository;

    public static getInstance() {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }

        return SpecificationsRepository.INSTANCE;
    }

    create(specificationDTO: ICreateSpecificationDTO): Specification {
        const specification = new Specification();

        Object.assign(specification, specificationDTO);

        this.specifications.push(specification);

        return specification;
    }

    findByName(name: string): Specification | undefined {
        return this.specifications.find((s) => s.name === name);
    }

    list(): Specification[] {
        return this.specifications;
    }
}
