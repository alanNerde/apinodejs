import { supabase } from '../../database/supabase';
import { Customer } from './CustomerModel';

class CustomerRepository {
  async create(customer: Omit<Customer, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('customer')
      .insert({
        name: customer.name,
        cpf_cnpj: customer.cpf_cnpj,
        phone: customer.phone,
        email: customer.email,
        birth_date: customer.birth_date,
        status: customer.status,
      });

    if (error) {
      throw new Error(`Erro ao criar cliente: ${error.message}`);
    }
  }

  async findAll(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customer')
      .select('*');

    if (error) {
      throw new Error(`Erro ao buscar clientes: ${error.message}`);
    }

    return data;
  }

  async findById(customerId: number): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customer')
      .select('*')
      .eq('id', customerId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Cliente não encontrado
      }
      throw new Error(`Erro ao buscar cliente: ${error.message}`);
    }

    return data;
  }

  async update(
    id: number,
    dados: Partial<Omit<Customer, 'id'>>
  ): Promise<void> {
    // Remove campos vazios
    const updateData = Object.fromEntries(
      Object.entries(dados).filter(([_, value]) =>
        value !== undefined && value !== null && value !== ''
      )
    );

    if (Object.keys(updateData).length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    const { error } = await supabase
      .from('customer')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao atualizar cliente: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('customer')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao deletar cliente: ${error.message}`);
    }
  }
}

const customerRepository = new CustomerRepository();
export default customerRepository;
