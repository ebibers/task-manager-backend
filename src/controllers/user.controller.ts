import data from '../../public/assets/users.json' assert { type: "json" };
import { Request, Response } from 'express';
import { getAll, storeUser, getById } from '../models/user.model.js';
import mongoose from 'mongoose';

// Populates database with dummy data from json file.
export async function populateDummyData(req: Request, res: Response) {
  for (let entry of data) {
    await storeUser(entry);
  }
  
  res.send(true);
}

export async function getAllUsers(req: Request, res: Response) {
  const userData = await getAll();

  const users = userData.map(user => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: user.password,
  }));

  res.send(users);
}

export async function createUser(req: Request, res: Response) {
  const userData = req.body.user;

  if (userData) {
    try {
      const newUser = await storeUser(userData);

      const user = {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        password: newUser.password,
      }

      res.send(user);
    } catch {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(500);
  }
}

export async function getUser(req: Request, res: Response) {
  const id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const userData = await getById(id);

    if (userData) {
      const user = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        password: userData.password,
      }
  
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
}