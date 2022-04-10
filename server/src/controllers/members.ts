import { Request, Response } from 'express';
import db from '../db/models';

export const addProjectMembers = async (req: Request, res: Response) => {
  const memberIds = req.body.members as string[];
  const { projectId } = req.params;
  try {
    const targetProject = await db.Project.findOne({
      where: {
        id: projectId
      },
      include:{
        model: db.User,
        attributes: ['id', 'username', 'fName', 'lName'],
      }
    });

    if (!targetProject) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (targetProject.createdBy !== req.user.id) {
      return res.status(401).json({ message: 'Access denied' });
    }

    // check wether the id members are repeated or not
    const currentMembers = targetProject.Users.map((m:{ id: string }) => m.id);
    const allMembers = [ ...currentMembers,...memberIds ];

    if (allMembers.filter((m, i) => allMembers.indexOf(m) !== i).length !== 0) {
      return res.status(401).json({ message: 'Members field must not have already-added/duplicate IDs.' });
    }

    const membersArray = memberIds.map((memberId) => ({
      UserId: memberId,
      ProjectId: projectId,
      JoinedAt: new Date(),
    }));
    const member = await db.ProjectAssignment.bulkCreate(membersArray);

    res.json({
      message: 'new member added',
      member
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const removeProjectMember = async (req: Request, res: Response) => {
  const { projectId, userId } = req.params;
  try {
    const targetProject = await db.Project.findOne({
      where: {
        id: projectId
      },
      include:{
        model: db.User,
        attributes: ['id'],
      }
    });

    if (!targetProject) {
      return res.status(404).json({ message: 'Project Not found' });
    }

    if (targetProject.createdBy !== req.user.id) {
      return res.status(401).json({ message: 'Access denied, you are not the creator of this project' });
    }

    if (targetProject.createdBy === userId) {
      return res.status(400).json({ message: 'Project creator can\'t be removed.' });
    }

    if (!targetProject.Users.map((m:{ id: string }) => m.id).includes(userId)) {
      return res.status(404).send({
        message: 'Member isn\'t part of the project or already removed.',
      });
    }

    await db.ProjectAssignment.destroy({ where: { ProjectId: projectId, UserId: userId } });
    res.json({ message: 'member removed from project' })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const leaveProjectAsMember = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {

    const targetProject = await db.Project.findOne({
      where: {
        id: projectId
      },
      include:{
        model: db.User,
        attributes: ['id'],
      }
    });

    if (!targetProject) {
      return res.status(404).json({ message: 'Project Not found' });
    }

    if (targetProject.createdBy === req.user.id) {
      return res.status(401).json({ message: 'Project creator can\'t leave.' });
    }

    if (!targetProject.Users.map((m:{ id: string }) => m.id).includes(req.user.id)) {
      return res.status(404).send({
        message: 'You\'re not a member of the project',
      });
    }

    await db.ProjectAssignment.destroy({ where: { ProjectId: projectId, UserId: req.user.id } });
    res.json({ message: 'You left the project' })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}