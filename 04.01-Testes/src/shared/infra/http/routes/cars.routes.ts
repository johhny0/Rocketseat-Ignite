import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

const carRoutes = Router();

carRoutes.use(ensureAuthenticated);

carRoutes.post("/", ensureAdmin, new CreateCarController().handle);

export { carRoutes };
