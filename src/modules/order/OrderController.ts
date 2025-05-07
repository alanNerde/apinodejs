import { Request, Response } from 'express';
import OrderService from './OrderService';

export default new (class OrderController {
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
})();
