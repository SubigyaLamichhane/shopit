import express from 'express';
import cookieParser from 'cookie-parser';

import { deleteProduct, getProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/productController.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(newProduct);

router.route('/admin/product/:id')
    .put(updateProduct)
    .delete(deleteProduct);

export default router;