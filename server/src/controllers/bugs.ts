import { Request, Response } from 'express';
import db from '../db/models';

export const getBugs = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const projectMembers = await db.ProjectAssignment.findAll({
      where: {
        ProjectId: projectId
      }
    });

    if(projectMembers.length === 0) {
      return res.status(404).json({ message: 'Project Not Found' });
    }
  
    if (!projectMembers.map((m:{ UserId: string}) => m.UserId).includes(req.user.id)) {
      return res.status(401).json({ message: 'Access is denied.' });
    }

    const bugs = await db.Bugs.findAll({
      where: {
        projectId
      }
    })

    res.json({
      message: 'getBugs',
      bugs
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const postBug = async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  const { projectId } = req.params;
  try {
    const projectMembers = await db.ProjectAssignment.findAll({
      where: {
        ProjectId: projectId
      }
    });
    
    if(projectMembers.length === 0) {
      return res.status(404).json({ message: 'Project Not Found' });
    }

    if (!projectMembers.map((m:{ UserId: string}) => m.UserId).includes(req.user.id)) {
      return res.status(401).json({ message: 'Access is denied.' });
    }

    const newBug = await db.Bugs.build({
      title,
      description,
      priority,
      projectId,
      createdBy: req.user.id,
    });

    await newBug.save();

    res.json({
      message: 'postbug',
      newBug
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const putBug = async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  const { projectId, bugId } = req.params;
  try {
    const projectMembers = await db.ProjectAssignment.findAll({
      where: {
        ProjectId: projectId
      }
    });
    if(projectMembers.length === 0) {
      return res.status(404).json({ message: 'Project Not Found' });
    }
    if (!projectMembers.map((m:{ UserId: string}) => m.UserId).includes(req.user.id)) {
      return res.status(401).json({ message: 'Access is denied.' });
    }

    const targetBug = await db.Bugs.findByPk(bugId);

    if (!targetBug) {
      return res.status(404).json({ message: 'Bug Not Found' });
    }

    targetBug.title = title;
    targetBug.description = description;
    targetBug.priority = priority;
    targetBug.updatedBy = req.user.id;
    targetBug.updatedAt = new Date();

    await targetBug.save();
    res.json({
      message: 'put bug',
      targetBug
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const deleteBug = async (req: Request  , res: Response) => {
  const { projectId, bugId } = req.params;
  try {

    const targetProject = await db.Project.findByPk(projectId);
    
    if (!targetProject) {
      return res.status(404).json({ message: 'Invalid project ID.' });
    }
    
    const targetBug = await db.Bugs.findByPk(bugId);

    if (!targetBug) {
      return res.status(404).json({ message: 'Invalid bug ID.' });
    }

    if (
      targetProject.createdBy !== req.user.id &&
      targetBug.createdBy !== req.user.id
    ) {
      return res.status(401).json({ message: 'Access is denied.' });
    }

    // await Note.delete({ bugId });
    await targetBug.destroy();

    res.json({
      message: 'delete bug',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const closeBug = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'closeBug',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const reopenBug = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'reopenBug',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}