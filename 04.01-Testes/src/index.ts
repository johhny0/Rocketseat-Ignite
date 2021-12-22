import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container";

import { FgGreen } from "./console/Colors";
import { AppError } from "./errors/AppError";
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                error: err.message,
            });
        }

        return response
            .status(500)
            .json({ error: `Internal server error - ${err.message}` });
    }
);

app.listen(PORT, () => {
    console.info(`${FgGreen}Listening on http://localhost:${PORT}/`);
});
