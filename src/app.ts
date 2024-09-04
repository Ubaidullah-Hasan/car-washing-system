import express, { Request, Response, Application } from "express";
import cors from "cors";
import { router } from "./app/routes";
import routeNotFound from "./app/middlewares/routeNotFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import path from 'path';

const app: Application = express();

// parser
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());


app.use('/assets', express.static(path.join(__dirname, './assets'))); // assets folder declaration
app.use("/api", router); // router declaration

app.get("/", (req: Request, res: Response) => {
  res.send("Server Is Running!");
});

// global error handler middlewares
app.use(globalErrorHandler);

// not found middleware
app.use(routeNotFound);

export default app;
