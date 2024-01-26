import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/task";
import authRouter from "./routes/auth"

const app: Express = express();

// allow cors
app.use(cors());
// prase json incoming req
app.use(express.json());
// extra security
app.use(helmet());

//routes
app.use('/api', router)
app.use('/auth', authRouter);


app.get("/", (req: Request, res: Response) => {
  res.json("hola desde el server");
});

export default app;