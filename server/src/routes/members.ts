import { Router } from 'express';
import { addProjectMembers, leaveProjectAsMember, removeProjectMember } from '../controllers/members';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
const router = Router();

router.post('/:projectId/members', [
  validateJWT,
  validateFields
], addProjectMembers);

router.delete('/:projectId/members/:userId', [
  validateJWT,
  validateFields
], removeProjectMember);

router.post('/:projectId/members/leave', [
  validateJWT,
  validateFields
], leaveProjectAsMember);

export default router;