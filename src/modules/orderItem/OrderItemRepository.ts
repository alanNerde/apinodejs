import { getDB } from '../../database/connection';
import { OrderItem } from './OrderItemModel';

class OrderItemRepository {
  /**
   * Insere um item ligado à venda passada em transaction.
   * @param orderId ID da venda já criada na mesma transação
   * @param item   dados do item (sem o id)
   */
  async createItem(
    orderId: number,
    item: Omit<OrderItem, 'id'>
  ): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `INSERT INTO "ORDER_ITEM"
         ("order", product, amount, unit_price, status)
       VALUES (?, ?, ?, ?, ?)`,
      [orderId, item.product, item.amount, item.unit_price, item.status]
    );
    return Number(result.lastID);
  }
}

export const orderItemRepository = new OrderItemRepository();
