import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../db/models';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await db.Project.findAll({
      include: {
        model: db.User,
        attributes: ['id', 'username', 'fName', 'lName']
      }
    });
    res.json({ projects })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const getProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const project = await db.Project.findOne({
      where: {
        id: projectId
      },
      include: {
        model: db.User,
        attributes: ['id', 'username', 'fName', 'lName']
      }
    });
    res.json({
      message: 'get one',
      project,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin adfasdf'
    });
  }
}

export const postProject = async (req: Request, res: Response) => {
  const { title } = req.body;
  const memberIds = req.body.members
    ? ([req.user.id, ...req.body.members] as string[])
    : [req.user.id];
  try {
    const newProject = await db.Project.build({ title, status: 'change this!!', createdBy: req.user.id });
    
    // bulk insert if more members
    const membersArray = memberIds.map((memberId) => ({
      UserId: memberId,
      ProjectId: newProject.id,
      JoinedAt: new Date(),
    }));

    await newProject.save();
    const member = await db.ProjectAssignment.bulkCreate(membersArray);

    res.json({
      message: 'post',
      newProject,
      member
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const putProject = async (req: Request, res: Response) => {
  const { title } = req.body;
  const { projectId } = req.params;
  try {
    const targetProject = await db.Project.findByPk(projectId);
    if (!targetProject) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    // only the creator can edit
    if (targetProject.createdBy !== req.user.id) {
      return res.status(401).json({
        message: 'Access denied'
      })
    }
    targetProject.title = title;
    await targetProject.save();
    res.json({
      message: 'put updated',
      targetProject
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const targetProject = await db.Project.findByPk(projectId);
    if (!targetProject) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    if (targetProject.createdBy !== req.user.id) {
      return res.status(401).json({
        message: 'Delete denied'
      })
    }

    await db.ProjectAssignment.destroy({ where: { ProjectId: projectId } });
    await targetProject.destroy();
    // await usuario.update({ estado: false });
    res.json({
      message: 'deleted'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}