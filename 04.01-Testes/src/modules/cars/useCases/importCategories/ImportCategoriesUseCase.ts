import { Parser } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "utils/file";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface ICategoryImport {
    name: string;
    description: string;
}

@injectable()
export class ImportCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private repository: ICategoriesRepository
    ) {}

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.forEach(async (category) => {
            const { name, description } = category;

            if (await this.repository.findByName(name)) return;

            this.repository.create({ name, description });
        });
    }

    loadCategories(file: Express.Multer.File): Promise<ICategoryImport[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: ICategoryImport[] = [];

            const parseFile = new Parser({});

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;

                categories.push({ name, description });
            });

            stream.on("end", () => deleteFile(file.path));
            parseFile.on("end", () => resolve(categories));
            parseFile.on("error", reject);
        });
    }
}
