import data from '../../public/assets/tasks.json' assert { type: "json" };
import { storeTask } from '../models/task.model.js';
import { Request, Response } from 'express';

// Populates database with dummy data from json file.
export async function populateDummyData(req: Request, res: Response) {
  for (let entry of data) {
    await storeTask(entry);
  }
  res.send(true);
}