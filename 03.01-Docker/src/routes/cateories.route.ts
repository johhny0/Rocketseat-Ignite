import { Request, Response, Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoriesController } from "../modules/cars/useCases/importCategories";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoryRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

categoryRoutes.post("/", (request: Request, response: Response) => {
    return createCategoryController.handle(request, response);
});

categoryRoutes.get("/", (request: Request, response: Response) => {
    return listCategoriesController.handle(request, response);
});

categoryRoutes.post(
    "/import",
    upload.single("file"),
    (request: Request, response: Response) => {
        return importCategoriesController.handle(request, response);
    }
);

export { categoryRoutes };
