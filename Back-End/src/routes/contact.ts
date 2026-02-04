import { Router } from 'express';
import { submitCallRequest, submitRedlineRequest, listContactRequests } from '../controllers/contactController';
import { requireAuth, requireSuperadmin } from '../controllers/authController';

const router = Router();

router.post('/call', submitCallRequest);
router.post('/redline', submitRedlineRequest);
router.get('/all', requireAuth, requireSuperadmin, listContactRequests);

export default router;
