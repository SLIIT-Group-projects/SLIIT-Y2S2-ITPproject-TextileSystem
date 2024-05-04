import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,

} from '../controllers/orderController.js';


router.route('/').post( addOrderItems)
router.route('/mine').get( getMyOrders);
router.route('/:id').get( getOrderById);
router.route('/:id/pay').put( updateOrderToPaid);


export default router;
