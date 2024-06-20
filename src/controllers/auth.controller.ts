import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { compare } from 'bcrypt-ts';
import { Request, Response } from 'express';
import { getByUsername } from '../models/user.model.js';
import { deleteToken, findToken, storeToken } from '../models/auth.model.js';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export function getAuthUser(req: Request, res: Response) {
  const userData = req.user;

  const user = {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    password: userData.password,
  } 

  res.send(user);
}

export async function login(req: Request, res: Response) {
  const userData = await getByUsername(req.body.username);

  if (userData) {
    try {
      if (await compare(req.body.password, userData.password)) {
        if (ACCESS_TOKEN_SECRET && REFRESH_TOKEN_SECRET) {
          const user = {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            password: userData.password,
          }          

          const accessToken = generateAccessToken(user);

          const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);

          await storeToken(refreshToken);

          res.json({ user: user, accessToken: accessToken, refreshToken: refreshToken });
        }
      } else {
        res.status(400).send();
      }
    } catch {
      res.status(500).send();
    }
  } else {
    res.status(400).send();
  }
}

export async function logout(req: Request, res: Response) {
  await deleteToken(req.body.token);

  res.status(204).send(req.body.token);
}

export async function refreshToken(req: Request, res: Response) {
  const refreshTokenData = req.body.token;

  if (refreshTokenData == null) {
    return res.sendStatus(401);
  }

  const refreshToken = await findToken(refreshTokenData);

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  if (REFRESH_TOKEN_SECRET) {
    jwt.verify(refreshToken.token, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);

      const accessToken = generateAccessToken(user);

      res.json({ accessToken: accessToken });
    })
  }
}

function generateAccessToken(userData: any) {
  const user = {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    password: userData.password,
  } 

  if (ACCESS_TOKEN_SECRET) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
  }
}