import express from 'express';
import { getPaginatedProducts } from '../controllers/productController';

const router = express.Router();

router.get('/', getPaginatedProducts); // /api/products?page=1&limit=20

export default router;
