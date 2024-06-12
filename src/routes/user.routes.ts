import { Router } from "express";
import { getAllUsers, populateDummyData, getUser } from "../controllers/user.controller.js";

export const routes = Router();

routes.get('/populate', populateDummyData);

routes.get('/', getAllUsers);

routes.get('/:id', getUser);