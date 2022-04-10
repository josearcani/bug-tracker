import { Router } from 'express';
import { closeBug, deleteBug, getBugs, postBug, putBug, reopenBug } from '../controllers/bugs';

import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
const router = Router();

router.get('/:projectId/bugs',[
  validateJWT,
  validateFields
], getBugs);

router.post('/:projectId/bugs',[
  validateJWT,
  validateFields
], postBug);

router.put('/:projectId/bugs/:bugId',[
  validateJWT,
  validateFields
], putBug);

router.delete('/:projectId/bugs/:bugId',[
  validateJWT,
  validateFields
], deleteBug);

router.post('/:projectId/bugs/:bugId/close',[
  validateJWT,
  validateFields
], closeBug);

router.post('/:projectId/bugs/:bugId/reopen',[
  validateJWT,
  validateFields
], reopenBug);


export default router;