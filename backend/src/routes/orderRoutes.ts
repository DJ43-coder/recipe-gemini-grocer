import { Router } from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getUserCart,
  updateCart,
  clearCart,
} from '../controllers/orderController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getUserOrders);
router.get('/:id', authenticate, getOrderById);

// Cart routes
router.get('/cart/items', authenticate, getUserCart);
router.post('/cart/items', authenticate, updateCart);
router.delete('/cart/items', authenticate, clearCart);

export default router;
