import { Router } from 'express';
import { signup, signin } from '../service/authService';

const router = Router();
router.post('/v1/member', addMember);
router.delete('/v1/member/:id', deleteMember);

export default router;