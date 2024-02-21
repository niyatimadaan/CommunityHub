import { Router } from 'express';
import { signup, signin } from '../service/authService';

const router = Router();
router.post('/v1/role', createRole);
router.get('/v1/role', getRole);

export default router;