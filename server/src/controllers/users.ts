import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../db/models';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll({
      where: { id: { [Op.not]: req.user.id } }, // findAll except myself
      attributes: { exclude: ['password']}, // everything except 
      // attributes: ['firstName', 'lastName', 'email'] // name all attributes  you want
      include: {
        model: db.Project,
        // attributes: {
        //   exclude: ['status']
        // }
      }
    });

    res.json({ users })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}


// soft delete and restore
// await db.User.destroy({
//   where: {
//   id: '6470b040-8b08-4d00-800a-09468c4fbc85'
//   }
// });
// const userRestored = await db.User.findOne({
//   where: {
//     id: '6470b040-8b08-4d00-800a-09468c4fbc85'
//   },
//   paranoid: false
// });
// await userRestored.restore();