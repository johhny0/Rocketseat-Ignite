import { Router } from "express";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationRoutes = Router();

specificationRoutes.use(ensureAuthenticated);

specificationRoutes.post("/", new CreateSpecificationController().handle);

specificationRoutes.get("/", new ListSpecificationsController().handle);

export { specificationRoutes };
