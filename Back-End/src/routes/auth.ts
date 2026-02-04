import { Router } from 'express';
import {
  login,
  register,
  createUser,
  requireAuth,
  requireSuperadmin,
  listUsers,
  updateUserRole,
  updateOwnPassword,
  deleteUser,
} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create', requireAuth, createUser);
router.get('/users', requireAuth, requireSuperadmin, listUsers);
router.put('/users/:id', requireAuth, requireSuperadmin, updateUserRole);
router.put('/password', requireAuth, updateOwnPassword);
router.delete('/users/:id', requireAuth, requireSuperadmin, deleteUser);

export default router;
