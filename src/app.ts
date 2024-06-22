import express, { Request, Response, Application } from "express";
import cors from "cors";
import { router } from "./app/routes";
import routeNotFound from "./app/middlewares/routeNotFound";

const app: Application = express();

// parser
app.use(cors({ origin: ["http://localhost/6000"] }));
app.use(express.json());

app.use("/api", router);


app.get("/", (req: Request, res: Response) => {
  res.send("Server Is Running!");
});




// not found middleware
app.use(routeNotFound);


export default app;
