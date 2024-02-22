import { Router } from 'express';
import { requireAuth } from '../utils/requireAuth.js';
import { addMember, deleteMember } from '../service/memberService.js';

const memberRoutes = Router();
memberRoutes.post('/', requireAuth, addMember);
memberRoutes.delete('/:id', requireAuth, deleteMember);

export default memberRoutes;