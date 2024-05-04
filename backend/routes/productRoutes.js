import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  getTopProducts,
} from '../controllers/productController.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProducts)
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)


export default router;
