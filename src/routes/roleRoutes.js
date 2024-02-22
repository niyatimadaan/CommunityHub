import { Router } from 'express';
import { createRole, getAllRole } from '../service/roleService.js';

const roleRoutes = Router();
roleRoutes.post('/', createRole);
roleRoutes.get('/', getAllRole);

export default roleRoutes;