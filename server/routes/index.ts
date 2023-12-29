import express from "express";
import gptResponse from "./gptResponse";

export const routes = express.Router();

routes.use(gptResponse);
