import { Router } from "express";
import { populateDummyData, getAllTasks, createTask, deleteTask, getTask, editTask } from "../controllers/task.controller.js";

export const routes = Router();

routes.get('/populate', populateDummyData);

routes.get('/get-all-tasks', getAllTasks);

routes.post('/create-task', createTask);

routes.delete('/delete-task/:id', deleteTask);

routes.get('/get-task/:id', getTask);

routes.patch('/update-task/:id', editTask);