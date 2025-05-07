import { Router } from 'express';
import OrderController from './OrderController';

const router = Router();

router.post('/', OrderController.create);

export default router;
