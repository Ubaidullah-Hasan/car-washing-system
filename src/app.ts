import express, { Request, Response, Application } from "express";
import cors from "cors";
import { router } from "./app/routes";

const app: Application = express();

// parser
app.use(cors({ origin: ["http://localhost/6000"] }));
app.use(express.json());

app.use("/api", router);


app.get("/", (req: Request, res: Response) => {
  res.send("Server Is Running!");
});

export default app;
