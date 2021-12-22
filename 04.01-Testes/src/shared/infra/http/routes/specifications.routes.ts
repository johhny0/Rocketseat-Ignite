import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationRoutes = Router();

specificationRoutes.use(ensureAuthenticated);

specificationRoutes.post("/", new CreateSpecificationController().handle);

specificationRoutes.get("/", new ListSpecificationsController().handle);

export { specificationRoutes };
