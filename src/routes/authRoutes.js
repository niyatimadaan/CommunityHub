import { Router } from 'express';
import { signup, signin, getMe } from '../service/authService.js';
import { requireAuth } from '../utils/requireAuth.js';
import { validationRules } from '../utils/signUpValidation.js';

const authRoutes = Router();
authRoutes.post('/signup', validationRules, signup);
authRoutes.post('/signin', signin);
authRoutes.get('/me', requireAuth , getMe);

export default authRoutes;
