import { Router } from 'express';
import { validateFields } from '../../middlewares/ValidateFields';
import CustomerController from './CustomerController';

const router = Router();

router.get('/', CustomerController.getAll);
router.get('/:id', CustomerController.findById);
router.post(
  '/',
  validateFields([
    'nome',
    'cpf_cnpj',
    'telefone',
    'email',
    'data_nascimento',
    'status',
  ]),
  CustomerController.create
);
router.put('/:id', CustomerController.update);
router.delete('/:id', CustomerController.delete);

export default router;
