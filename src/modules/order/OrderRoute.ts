import { Router } from 'express';
import OrderController from './OrderController';

const router = Router();

router.post('/', OrderController.create);
router.put('/:id', OrderController.put);
router.get('/:id', OrderController.getById);
router.get('/', OrderController.getAll);
router.get('/:id/itens', OrderController.getOrderWithItens);

export default router;
