import { Router } from 'express';
import { createCommunity, getAllCommunities, getAllMembers, getMyJoinedCommunities, getMyOwnedCommunities } from '../service/communityService.js';
import { requireAuth } from '../utils/requireAuth.js';

const communityRoutes = Router();
communityRoutes.post('/', requireAuth, createCommunity);
communityRoutes.get('/', getAllCommunities);
communityRoutes.get('/:id/members', getAllMembers);
communityRoutes.get('/me/owner', requireAuth, getMyOwnedCommunities);
communityRoutes.get('/me/member', requireAuth, getMyJoinedCommunities);

export default communityRoutes;