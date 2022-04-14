import { Router } from 'express';
import { body, param } from 'express-validator';
import { deleteProject, getProject, getProjects, postProject, putProject } from '../controllers/projects';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
const router = Router();

router.get('/', [
  validateJWT,
  validateFields
], getProjects);

router.get('/:projectId', [
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  validateFields
], getProject);

router.post('/', [
  validateJWT,
  body('title').notEmpty(),
  validateFields
], postProject);

router.put('/:projectId', [
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  body('title').notEmpty(),
  validateFields
], putProject);

router.delete('/:projectId', [
  validateJWT,
  param('projectId', 'projectID not valid').isUUID(),
  validateFields
], deleteProject);

export default router;