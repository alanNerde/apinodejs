import { getDB } from '../../database/connection';
import { orderItemRepository } from '../orderItem/OrderItemRepository';
import { OrderDto, OrderDtoWithoutId } from './OrderDto';
import { Order } from './OrderModel';
import OrderRepository from './OrderRepository';

export class OrderService {
  /**
   * Cria uma venda e todos os seus itens dentro de uma transação.
   * @param dados Objeto contendo os campos da venda e um array `itens`
   */
  async criar(dados: OrderDto): Promise<number> {
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

  async put(id: number, date: Partial<OrderDtoWithoutId>): Promise<void> {
    await OrderRepository.putOrder(id, date);
  }

  async getAll(): Promise<Order[] | null> {
    return await OrderRepository.listAll();
  }

  async getById(id: number): Promise<Order | null> {
    return await OrderRepository.listById(id);
  }

  async getOrderWithItens(id: number): Promise<OrderDtoWithoutId | null> {
    return OrderRepository.listOrderWithItens(id);
  }
}

const orderService = new OrderService();
export default orderService;
