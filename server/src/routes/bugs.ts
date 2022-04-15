import { Router } from 'express';
import { body, param } from 'express-validator';
import { closeBug, deleteBug, getBugs, postBug, putBug, reopenBug } from '../controllers/bugs';

import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { validatePriority } from '../middlewares/validate-priority';

const router = Router();

router.get('/:projectId/bugs',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  validateFields
], getBugs);

router.post('/:projectId/bugs',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('priority').notEmpty(),
  validatePriority('low', 'medium', 'high'),
  validateFields
], postBug);

router.put('/:projectId/bugs/:bugId',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  param('bugId', 'bugId not valid').isUUID(),
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('priority').notEmpty(),
  validatePriority('low', 'medium', 'high'),
  validateFields
], putBug);

router.delete('/:projectId/bugs/:bugId',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  param('bugId', 'bugId not valid').isUUID(),
  validateFields
], deleteBug);

router.post('/:projectId/bugs/:bugId/close',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  param('bugId', 'bugId not valid').isUUID(),
  validateFields
], closeBug);

router.post('/:projectId/bugs/:bugId/reopen',[
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  param('bugId', 'bugId not valid').isUUID(),
  validateFields
], reopenBug);


export default router;