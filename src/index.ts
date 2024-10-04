import express, { Application, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errors";
import router from "./routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(cors());

app.use(errorHandler);

app.use(router);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
