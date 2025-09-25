import { supabase } from '../../database/supabase';
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
    const { data, error } = await supabase
      .from('order_item')
      .insert({
        order_id: orderId,
        product_id: item.product,
        amount: item.amount,
        unit_price: item.unit_price,
        status: item.status
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Erro ao criar item do pedido: ${error.message}`);
    }

    return data.id;
  }

  async put(id: number, data: Partial<Omit<OrderItem, 'id'>>): Promise<void> {
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
      .from('order_item')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao atualizar item do pedido: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('order_item')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao deletar item do pedido: ${error.message}`);
    }
  }
}

export const orderItemRepository = new OrderItemRepository();
