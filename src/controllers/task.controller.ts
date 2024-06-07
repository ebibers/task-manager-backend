import data from '../../public/assets/tasks.json' assert { type: "json" };
import { storeTask, getAll, removeTask, getById, updateTask } from '../models/task.model.js';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Populates database with dummy data from json file.
export async function populateDummyData(req: Request, res: Response) {
  for (let entry of data) {
    await storeTask(entry);
  }
  
  res.send(true);
}

export async function getAllTasks(req: Request, res: Response) {
  const taskData = await getAll();

  const tasks = taskData.map(task => ({
    id: task._id,
    title: task.title,
    description: task.description,
    type: task.type,
    createdOn: task.createdOn,
    status: task.status
  }));

  res.send(tasks);
}

export async function createTask(req: Request, res: Response) {
  const task = req.body;

  if (task) {
    await storeTask(task);
    
    res.send(true);
  } else {
    res.send(false);
  }
}

export async function deleteTask(req: Request, res: Response) {
  const id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    await removeTask(id);

    res.send(true);
  } else {
    res.sendStatus(404);
  }
}

export async function getTask(req: Request, res: Response) {
  const id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const taskData = await getById(id);

    if (taskData) {
      const task = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        type: taskData.type,
        createdOn: taskData.createdOn,
        status: taskData.status
      }
  
      res.send(task);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
}

export async function editTask(req: Request, res: Response) {
  const id = req.params.id;

  const task = req.body;

  if (mongoose.Types.ObjectId.isValid(id) && task) {
    await updateTask(id, task);
    
    res.send(true);
  } else {
    res.sendStatus(404);
  }
}