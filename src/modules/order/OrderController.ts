import { Request, Response } from 'express';
import OrderService from './OrderService';

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const dados = req.body;

      // Você pode validar manualmente aqui se quiser
      if (!dados.customer || !dados.itens || !Array.isArray(dados.itens)) {
        return res.status(400).json({ error: 'Dados inválidos para venda' });
      }

      await OrderService.criar(dados);
      res.status(201).json({ message: 'Venda criada com sucesso' });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erro ao criar venda' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAll();

      if (orders === null) {
        return res
          .status(400)
          .json({ error: 'Não há nenhuma order registrada' });
      }

      return res.status(200).json(orders);
    } catch (error) {
      console.log('Erro ao buscar todas as orders', error);
      return res
        .status(400)
        .json({ error: 'Erro interno ao buscar todas as orders' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const idNumber = parseInt(req.params.id, 10);

      if (isNaN(idNumber)) {
        return res
          .status(400)
          .json({ error: 'Um número deve ser passado como parâmetro' });
      }

      const order = await OrderService.getById(idNumber);

      if (order === null) {
        return res.status(400).json({ error: 'Id não encontrado' });
      }

      return res.status(201).json(order);
    } catch (error) {
      console.log('Erro ao buscar order', error);
      return res
        .status(500)
        .json({ message: 'Erro interno ao buscar order', error });
    }
  }

  async getOrderWithItens(req: Request, res: Response) {
    try {
      const idNumber = parseInt(req.params.id, 10);

      if (isNaN(idNumber)) {
        return res
          .status(400)
          .json({ error: 'Um número deve ser passado como parâmetro' });
      }

      const order = await OrderService.getOrderWithItens(idNumber);

      if (order === null) {
        return res.status(400).json({ error: 'Id não encontrado' });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.log('Erro ao buscar order', error);
      return res
        .status(500)
        .json({ message: 'Erro interno ao buscar order', error });
    }
  }

  async put(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID não é um número' });
      }

      if (OrderService.getById(id) === null) {
        return res.status(400).json({ message: 'ID não encontrado' });
      }

      const { customer, total_amount, date, status, address } = req.body;
      await OrderService.put(id, {
        customer,
        total_amount,
        date,
        status,
        address,
      });

      res.status(201).json(OrderService.getById(id));
    } catch (error) {
      console.error('Erro ao atualizar Order:', error);
      return res.status(500).json({ error: 'Erro interno ao atualizar Order' });
    }
  }
}

const orderController = new OrderController();
export default orderController;
