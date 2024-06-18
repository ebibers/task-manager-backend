import { Router } from "express";
import { populateDummyData, getAllTasks, createTask, deleteTask, getTask, editTask } from "../controllers/task.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

export const routes = Router();

routes.get('/populate', populateDummyData);

routes.get('/', authenticateToken, getAllTasks);

routes.post('/', authenticateToken, createTask);

routes.delete('/:id', authenticateToken, deleteTask);

routes.get('/:id', authenticateToken, getTask);

routes.patch('/:id', authenticateToken, editTask);