import { Router } from 'express';
import { body, param } from 'express-validator';
import { addProjectMembers, leaveProjectAsMember, removeProjectMember } from '../controllers/members';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
const router = Router();

router.post('/:projectId/members', [
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  body('members').isArray(),
  validateFields
], addProjectMembers);

router.delete('/:projectId/members/:userId', [
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  param('userId', 'userId not valid').isUUID(),
  validateFields
], removeProjectMember);

router.post('/:projectId/members/leave', [
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  validateFields
], leaveProjectAsMember);

export default router;