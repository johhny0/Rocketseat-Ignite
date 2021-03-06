import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request: Request, response: Response) =>
    response.json({ status: "Connected🔥", date: new Date() })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
});
