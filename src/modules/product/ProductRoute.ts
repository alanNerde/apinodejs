import { Router } from 'express';
import bolinhaController from './ProductController';

const router = Router();

router.get('/', bolinhaController.getAll);
router.get('/:id', bolinhaController.findById);
router.post('/', bolinhaController.create);
router.put('/:id', bolinhaController.update);
router.delete('/:id', bolinhaController.delete);

export default router;
