import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { routes as taskRoutes } from './routes/task.routes.js';
import { routes as userRoutes } from './routes/user.routes.js';

const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

app.get('/', (req: Request, res: Response) => {
  res.send("Endpoint Works!");
});

app.use('/api/tasks', taskRoutes);

app.use('/api/users', userRoutes);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.hg877da.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
  console.log("Connected to the database!");

  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });
})
.catch(() => {
  console.log("Connection failed!");
});