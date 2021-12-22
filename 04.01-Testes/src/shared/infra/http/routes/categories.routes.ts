import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoryRoutes = Router();

const upload = multer(uploadConfig.upload("./files/tmp"));

categoryRoutes.use(ensureAuthenticated);

categoryRoutes.post("/", new CreateCategoryController().handle);

categoryRoutes.get("/", new ListCategoriesController().handle);

categoryRoutes.post(
    "/import",
    upload.single("file"),
    new ImportCategoriesController().handle
);

export { categoryRoutes };
