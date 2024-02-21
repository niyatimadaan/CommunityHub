import { Router } from 'express';
const router = Router();
import { signup, signin } from '../service/authService';

router.post('/v1/auth/signup', signup);
router.post('/v1/auth/signin', signin);
router.post('/v1/auth/signin', signin);
// Optionally, add more routes as needed

export default router;
