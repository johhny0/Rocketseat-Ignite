import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carRoutes = Router();

carRoutes.use(ensureAuthenticated);

carRoutes.post("/", new CreateCarController().handle);

export { carRoutes };
