import { getDB } from '../../database/connection';
import { Order } from './OrderModel';

export default new (class OrderRepository {
  async createOrder(order: Omit<Order, 'id'>): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `INSERT INTO "ORDER" (customer, total_amount, date, status, address)
       VALUES (?, ?, ?, ?, ?)`,
      [
        order.customer,
        order.total_amount,
        order.date,
        order.status,
        order.address,
      ]
    );
    return Number(result.lastID);
  }
})();
