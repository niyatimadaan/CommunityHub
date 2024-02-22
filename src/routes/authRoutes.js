import { Router } from 'express';
import { signup, signin, getMe } from '../service/authService.js';
import { requireAuth } from '../utils/requireAuth.js';

const authRoutes = Router();
authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.post('/me', requireAuth , getMe);

export default authRoutes;
