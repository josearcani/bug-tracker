import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../db/models';

export const addProjectMembers = async (req: Request, res: Response) => {
  try {
    res.json({ message: 'add projects' })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const removeProjectMember = async (req: Request, res: Response) => {
  try {
    res.json({ message: 'remove project member' })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const leaveProjectAsMember = async (req: Request, res: Response) => {
  try {
    res.json({ message: 'leave project as a member' })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}