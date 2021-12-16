import { Router } from "express";

import { categoryRoutes } from "./cateories.route";
import { specificationRoutes } from "./specifications.route";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/specifications", specificationRoutes);

export { router };
