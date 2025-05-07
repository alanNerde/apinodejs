import { getDB } from '../../database/connection';
import { orderItemRepository } from '../orderItem/OrderItemRepository';
import OrderRepository from './OrderRepository';

export default new (class OrderService {
  /**
   * Cria uma venda e todos os seus itens dentro de uma transação.
   * @param dados Objeto contendo os campos da venda e um array `itens`
   */
  async criar(dados: {
    customer: number;
    total_amount: number;
    date: string;
    status: string;
    address: number;
    itens: Array<{
      product: number;
      amount: number;
      unit_price: number;
      status: string;
    }>;
  }): Promise<number> {
    const db = await getDB();
    try {
      await db.run('BEGIN TRANSACTION');

      // 1) insere o cabeçalho da venda
      const vendaId = await OrderRepository.createOrder({
        customer: dados.customer,
        total_amount: dados.total_amount,
        date: dados.date,
        status: dados.status,
        address: dados.address,
      });

      // 2) insere cada item
      for (const item of dados.itens) {
        await orderItemRepository.createItem(vendaId, {
          order: vendaId,
          product: item.product,
          amount: item.amount,
          unit_price: item.unit_price,
          status: item.status,
        });
      }

      // 3) confirma tudo
      await db.run('COMMIT');
      return vendaId;
    } catch (err) {
      // desfaz se qualquer insert falhar
      await db.run('ROLLBACK');
      throw err;
    }
  }
})();
