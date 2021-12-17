import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoryRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

categoryRoutes.post("/", new CreateCategoryController().handle);

categoryRoutes.get("/", new ListCategoriesController().handle);

categoryRoutes.post(
    "/import",
    upload.single("file"),
    new ImportCategoriesController().handle
);

export { categoryRoutes };
