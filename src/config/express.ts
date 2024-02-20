import express from "express";
import { routes } from "../router/routes";
import { errorMiddleware } from "../middleware/error.middleware";

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

export { app };
