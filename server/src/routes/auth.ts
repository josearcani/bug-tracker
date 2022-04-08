import { Router } from 'express';
import { login, signup, google } from '../controllers/auth';
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/google', google);

export default router;