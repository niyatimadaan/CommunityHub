import { Router } from 'express';
import { signup, signin } from '../service/authService';

const router = Router();
router.post('/v1/community', createCommunity);
router.get('/v1/community', getAllCommunities);
router.get('/v1/community/:id/members', getAllMembers);
router.get('/v1/community/me/owner', getMyOwnedCommunities);
router.get('/v1/community/me/member', getMyJoinedCommunities);

export default router;