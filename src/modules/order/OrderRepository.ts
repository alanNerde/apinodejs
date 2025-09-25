import { supabase } from '../../database/supabase';
import { OrderDto, OrderDtoWithoutId } from './OrderDto';
import { Order } from './OrderModel';

export class OrderRepository {
  async createOrder(order: Omit<Order, 'id'>): Promise<number> {
    const { data, error } = await supabase
      .from('order')
      .insert({
        customer_id: order.customer,
        total_amount: order.total_amount,
        date: order.date,
        status: order.status,
        address_id: order.address
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Erro ao criar pedido: ${error.message}`);
    }

    return data.id;
  }

  async listAll(): Promise<Order[] | null> {
    const { data, error } = await supabase
      .from('order')
      .select('*');

    if (error) {
      throw new Error(`Erro ao listar pedidos: ${error.message}`);
    }

    return data;
  }

  async listById(id: number): Promise<Order | null> {
    const { data, error } = await supabase
      .from('order')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Pedido não encontrado
      }
      throw new Error(`Erro ao buscar pedido: ${error.message}`);
    }

    return data;
  }

  async listOrderWithItens(id: number): Promise<OrderDto | null> {
    const { data: order, error: orderError } = await supabase
      .from('order')
      .select(`
        *,
        itens:order_item(*)
      `)
      .eq('id', id)
      .single();

    if (orderError) {
      if (orderError.code === 'PGRST116') {
        return null; // Pedido não encontrado
      }
      throw new Error(`Erro ao buscar pedido com itens: ${orderError.message}`);
    }

    return order;
  }

  async putOrder(id: number, data: Partial<OrderDtoWithoutId>): Promise<void> {
    // Remove campos vazios
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) =>
        value !== undefined && value !== null && value !== ''
      )
    );

    if (Object.keys(updateData).length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    const { error } = await supabase
      .from('order')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao atualizar pedido: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('order')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao deletar pedido: ${error.message}`);
    }
  }
}

const order_repository = new OrderRepository();
export default order_repository;
