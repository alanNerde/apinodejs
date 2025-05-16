import { Router } from 'express';
import { validateFields } from '../../middlewares/ValidateFields';
import CustomerController from './CustomerController';

const router = Router();

router.get('/', CustomerController.getAll);
router.get('/:id', CustomerController.findById);
router.post(
  '/',
  validateFields([
    'name',
    'cpf_cnpj',
    'phone',
    'email',
    'birth_date',
    'status',
  ]),
  CustomerController.create
);
router.put('/:id', CustomerController.update);
router.delete('/:id', CustomerController.delete);

export default router;
