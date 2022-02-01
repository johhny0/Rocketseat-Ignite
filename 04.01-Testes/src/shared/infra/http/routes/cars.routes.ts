import { Router } from "express";

import { ListAvailableCarsController } from "@app/modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

const carRoutes = Router();

carRoutes.use(ensureAuthenticated);

carRoutes.get("/available", new ListAvailableCarsController().handle);
carRoutes.post("/", ensureAdmin, new CreateCarController().handle);

export { carRoutes };
