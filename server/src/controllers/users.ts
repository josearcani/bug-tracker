import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../db/models';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll({
      where: { id: { [Op.not]: req.user.id } }, // findAll except myself
      attributes: { exclude: ['password']} // everything except 
      // attributes: ['firstName', 'lastName', 'email'] // name all attributes  you want
    });
    res.json({ users })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}