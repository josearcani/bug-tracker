import { Router } from 'express';
import { deleteNote, postNote, putNote } from '../controllers/notes';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
const router = Router();

router.post('/:projectId/bugs/:bugId/notes',[
  validateJWT,
  validateFields
], postNote);

router.put('/:projectId/notes/:noteId',[
  validateJWT,
  validateFields
], putNote);

router.delete('/:projectId/notes/:noteId',[
  validateJWT,
  validateFields
], deleteNote);

export default router;