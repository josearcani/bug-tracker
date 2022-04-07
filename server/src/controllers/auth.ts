import { Request, Response } from 'express';
import db from '../db/models';

export const login = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll();
    console.log(users);
    res.json({users})
  } catch (error) {
    console.log(error);
  }
}


export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll();
    console.log(users);
    res.json({users})
  } catch (error) {
    console.log(error);
  }
}