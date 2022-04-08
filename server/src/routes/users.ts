import { Router } from 'express';
import { getUsers } from '../controllers/users';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
const router = Router();

router.get('/', [
  validateJWT,
  validateFields
],getUsers);

// router.post('/signup', signup);
// router.post('/google', google);

export default router;