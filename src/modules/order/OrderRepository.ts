import { getDB } from '../../database/connection';
import { OrderDto, OrderDtoWithoutId } from './OrderDto';
import { Order } from './OrderModel';

export class OrderRepository {
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

  async listAll(): Promise<Order[] | null> {
    const db = await getDB();
    const allOrders = await db.all(" SELECT * FROM 'ORDER' ");
    return allOrders ?? null;
  }

  async listById(id: number): Promise<Order | null> {
    const db = await getDB();
    const order = await db.get(" SELECT * FROM 'ORDER' WHERE ID = ?", [id]);
    return order ?? null;
  }

  async listOrderWithItens(id: number): Promise<OrderDto | null> {
    const db = await getDB();
    const order = await this.listById(id);
    if (!order) return null;
    const itens = await db.all('SELECT * FROM ORDER_ITEM WHERE "order" = ?', [
      id,
    ]);
    /*aqui o ... é um spread operator (operador que espalha). Ele está criando um objeto com
    as propriedades de order mais o array de itens.
    */
    return { ...order, itens };
  }

  async putOrder(id: number, date: Partial<OrderDtoWithoutId>): Promise<void> {
    const db = await getDB();
    let fields: string[] = [];
    const values: any[] = [];

    Object.entries(date).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        values.push(value);
        fields.push(`${key} = ?`);
      }
    });

    const fieldsSingleString = fields.join(', ');
    const sql = `UPDATE 'ORDER' SET ${fieldsSingleString} `;
    await db.run(sql, values);
  }
}

const order_repository = new OrderRepository();
export default order_repository;

let vendas;
const carregarVendas = async () => {
  vendas = await order_repository.listOrderWithItens(7);
  console.log(vendas);
};

carregarVendas();
