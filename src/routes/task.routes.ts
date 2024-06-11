import { Router } from "express";
import { populateDummyData, getAllTasks, createTask, deleteTask, getTask, editTask } from "../controllers/task.controller.js";

export const routes = Router();

routes.get('/populate', populateDummyData);

routes.get('/', getAllTasks);

routes.post('/', createTask);

routes.delete('/:id', deleteTask);

routes.get('/:id', getTask);

routes.patch('/:id', editTask);