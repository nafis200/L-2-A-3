import express, { Request, Response, Application } from "express";

import cors from "cors";

const app: Application = express();

app.use(cors({ origin: ["/localhost:5173"] }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;
