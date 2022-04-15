import { Router } from 'express';
import { body, param } from 'express-validator';
import { deleteNote, postNote, putNote } from '../controllers/notes';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
const router = Router();

router.post('/:projectId/bugs/:bugId/notes',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  param('bugId', 'bugId not valid').isUUID(),
  body('content').notEmpty(),
  validateFields
], postNote);

router.put('/:projectId/notes/:noteId',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  param('noteId').isNumeric(),
  body('content').notEmpty(),
  validateFields
], putNote);

router.delete('/:projectId/notes/:noteId',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  param('noteId').isNumeric(),
  validateFields
], deleteNote);

export default router;