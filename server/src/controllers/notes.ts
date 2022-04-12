import { Request, Response } from 'express';
import db from '../db/models';

export const postNote = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'postNote',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}
export const putNote = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'updateNote',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}
export const deleteNote = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'deleteNote',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}
