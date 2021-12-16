import { Parser } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICategoryImport {
    name: string;
    description: string;
}

export class ImportCategoriesUseCase {
    constructor(private repository: ICategoriesRepository) {}

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.forEach((category) => {
            const { name, description } = category;

            if (this.repository.findByName(name)) return;

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

            stream.on("end", () => {
                fs.unlink(file.path, () =>
                    console.log(`Arquivo ${file.path} removido`)
                );
            });

            parseFile.on("end", () => resolve(categories));
            parseFile.on("error", reject);
        });
    }
}
