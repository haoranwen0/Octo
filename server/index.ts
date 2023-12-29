import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routes } from "./routes";

var cors = require("cors");

dotenv.config();

const app: Express = express();
// Cor middleware allowing all origin access
app.use(cors());
app.use("/", routes)

// Get env variables
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
