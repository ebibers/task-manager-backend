import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader?.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  if (ACCESS_TOKEN_SECRET) {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      
      req.user = user;

      next();
    });
  }
}