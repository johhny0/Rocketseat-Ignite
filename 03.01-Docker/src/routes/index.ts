import { Router } from "express";

import { categoryRoutes } from "./categories.route";
import { specificationRoutes } from "./specifications.route";
import { usersRoutes } from "./users.route";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);

export { router };
