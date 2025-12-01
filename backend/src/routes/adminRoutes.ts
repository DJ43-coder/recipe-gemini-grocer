import { Router } from 'express';
import {
  getAllOrders,
  updateOrderStatus,
} from '../controllers/adminController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/orders', authenticate, requireAdmin, getAllOrders);
router.put('/orders/:id/status', authenticate, requireAdmin, updateOrderStatus);

export default router;
