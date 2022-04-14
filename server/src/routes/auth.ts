import { Router } from 'express';
import { check } from 'express-validator';
import { login, signup, google, renewJwt } from '../controllers/auth';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
const router = Router();

router.post('/login', login);

router.post('/signup', [
  check('username').notEmpty(),
  check('fName').notEmpty(),
  check('lName').notEmpty(),
  check('password').notEmpty(),
  check('email').isEmail(),
  validateFields
], signup);

router.post('/google', google);

router.get('/',[
  validateJWT,
  validateFields
], renewJwt);

export default router;