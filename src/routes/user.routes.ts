import { Router } from "express";
import { getAllUsers, populateDummyData, getUser, createUser, updateUserData } from "../controllers/user.controller.js";
import { login, logout, refreshToken, getAuthUser } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

export const routes = Router();

routes.get('/populate', populateDummyData);

routes.get('/auth-user', authenticateToken, getAuthUser);

routes.get('/', authenticateToken, getAllUsers);

routes.get('/:id', authenticateToken, getUser);

routes.patch('/:id', authenticateToken, updateUserData);

routes.post('/register', createUser);

routes.post('/login', login);

routes.post('/token', refreshToken);

routes.delete('/logout', logout);
