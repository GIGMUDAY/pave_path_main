import { Router } from 'express';
import { requireAuth, requireSuperadmin } from '../controllers/authController';
import { getOverview } from '../controllers/adminController';

const router = Router();

router.get('/overview', requireAuth, requireSuperadmin, getOverview);

export default router;
