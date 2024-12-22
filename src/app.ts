import express, { Request, Response, Application } from "express";

import cors from "cors";
import router from "./app/routes";
import globalErrorhandler from "./app/middleware/global-error-handler";
import Notfound from "./app/middleware/not-found";

const app: Application = express();

app.use(cors({ origin: ["/localhost:5173"] }));
app.use(express.json());

app.use('/api', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(globalErrorhandler)

app.use(Notfound);

export default app;
