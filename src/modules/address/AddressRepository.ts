import { supabase } from '../../database/supabase';
import { Address } from './AddressModel';

class AddressRepository {
  async create(address: Omit<Address, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('address')
      .insert({
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        postal_code: address.postal_code,
        city_id: address.city,
        complement: address.complemente, // Note: Fixed typo in field name
        type: address.type,
        customer_id: address.customer,
        status: address.status
      });

    if (error) {
      throw new Error(`Erro ao criar endereço: ${error.message}`);
    }
  }

  async findAll(): Promise<Address[]> {
    const { data, error } = await supabase
      .from('address')
      .select(`
        *,
        city:city_id(*),
        customer:customer_id(*)
      `);

    if (error) {
      throw new Error(`Erro ao buscar endereços: ${error.message}`);
    }

    return data;
  }

  async findById(id: number): Promise<Address | null> {
    const { data, error } = await supabase
      .from('address')
      .select(`
        *,
        city:city_id(*),
        customer:customer_id(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Endereço não encontrado
      }
      throw new Error(`Erro ao buscar endereço: ${error.message}`);
    }

    return data;
  }

  async update(id: number, dados: Partial<Omit<Address, 'id'>>): Promise<void> {
    // Remove campos vazios
    const updateData = Object.fromEntries(
      Object.entries(dados).filter(([_, value]) =>
        value !== undefined && value !== null && value !== ''
      )
    );

    if (Object.keys(updateData).length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    // Ajusta os nomes dos campos para o padrão do PostgreSQL
    if (updateData.city) {
      updateData.city_id = updateData.city;
      delete updateData.city;
    }
    if (updateData.customer) {
      updateData.customer_id = updateData.customer;
      delete updateData.customer;
    }
    if (updateData.complemente) {
      updateData.complement = updateData.complemente;
      delete updateData.complemente;
    }

    const { error } = await supabase
      .from('address')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao atualizar endereço: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('address')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao deletar endereço: ${error.message}`);
    }
  }
}

const addressRepository = new AddressRepository();
export default addressRepository;
