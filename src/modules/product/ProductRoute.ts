import { Router } from 'express';
import productController from './ProductController';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.findById);
router.post('/', productController.create);
router.put('/:id', productController.update);

export default router;
