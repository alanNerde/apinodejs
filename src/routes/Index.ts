import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/Auth';
import logUsuario from '../middlewares/LogUsuario';
import CustomerRoute from '../modules/customer/CustomerRoute';
import OrderRoute from '../modules/order/OrderRoute';
import productRoute from '../modules/product/ProductRoute';

const routes = Router();

routes.post('/login', AuthController.login);
routes.use('/customer', CustomerRoute);
routes.use('/order', OrderRoute);
routes.use('/product', productRoute);

// Exemplo de rota protegida
routes.get('/protegido', authMiddleware, logUsuario, (req, res) => {
  res.json({ message: 'Você acessou uma rota protegida!' });
});

export default routes;
