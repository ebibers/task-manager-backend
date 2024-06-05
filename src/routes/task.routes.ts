import { Router } from "express";
import { populateDummyData } from "../controllers/task.controller.js";

export const routes = Router();

routes.get('/populate', populateDummyData);