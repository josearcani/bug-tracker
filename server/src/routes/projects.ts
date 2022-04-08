import { Router } from 'express';
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
  validateFields
], getProject);

router.post('/', [
  validateJWT,
  validateFields
], postProject);

router.put('/:projectId', [
  validateJWT,
  validateFields
], putProject);

router.delete('/:projectId', [
  validateJWT,
  validateFields
], deleteProject);

export default router;