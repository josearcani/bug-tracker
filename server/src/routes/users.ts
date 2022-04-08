import { Router } from 'express';
import { getUsers } from '../controllers/users';
const router = Router();

router.get('/', getUsers);
// router.post('/signup', signup);
// router.post('/google', google);

export default router;