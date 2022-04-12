import { Request, Response } from 'express';
import db from '../db/models';

export const postNote = async (req: Request, res: Response) => {
  const { content } = req.body;
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
      return res.status(401).json({ message: 'Access is denied. Not a member of the project' });
    }
    const targetBug = await db.Bugs.findByPk(bugId);
    if(!targetBug) {
      return res.status(404).json({ message: 'Bug Not Found' });
    }
    
    const newNote = db.Note.build({ content, authorId: req.user.id, bugId });
    await newNote.save();
    res.json({
      message: 'postNote',
      newNote
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const putNote = async (req: Request, res: Response) => {
  const { content } = req.body;
  const { projectId, noteId } = req.params;
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
      return res.status(401).json({ message: 'Access is denied. Not a member of the project' });
    }
    const targetNote = await db.Note.findByPk(noteId);
    if(!targetNote) {
      return res.status(404).json({ message: 'Note Not Found' });
    }

    if (targetNote.authorId !== req.user.id) {
      return res.status(401).send({ message: 'Access is denied. It is not your note' });
    }

    targetNote.content = content;
    await targetNote.save();

    res.json({
      message: 'updateNote',
      targetNote
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const deleteNote = async (req: Request, res: Response) => {
  const { projectId, noteId } = req.params;
  try {
    const projectMembers = await db.Project.findAll({
      where: {
        id: projectId
      },
      include: {
        model: db.User,
        attributes: ['id']
      }
    });
    if(projectMembers.length === 0) {
      return res.status(404).json({ message: 'Project Not Found' });
    }
    if (!projectMembers[0].Users.map((m:{ id: string}) => m.id).includes(req.user.id)) {
      return res.status(401).json({ message: 'Access is denied. Not a member of the project' });
    }
    const targetNote = await db.Note.findOne({
      where: {
        id: noteId,
        authorId: req.user.id
      }
    });
    if(!targetNote) {
      return res.status(404).json({ message: 'Note Not Found or not your note' });
    }
    await targetNote.destroy();
    res.json({
      message: 'deleteNote',
      targetNote,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}
