import { supabase } from '../../database/supabase';
import { Product } from './ProductModel';

class ProductRepository {
  async create(product: Omit<Product, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('product')
      .insert({
        name: product.name,
        description: product.description,
        price: product.price,
        status: product.status
      });

    if (error) {
      throw new Error(`Erro ao criar produto: ${error.message}`);
    }
  }

  async findAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*');

    if (error) {
      throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }

    return data;
  }

  async findById(id: number): Promise<Product | null> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Produto não encontrado
      }
      throw new Error(`Erro ao buscar produto: ${error.message}`);
    }

    return data;
  }

  async put(id: number, dados: Partial<Omit<Product, 'id'>>): Promise<void> {
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
      .from('product')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao atualizar produto: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('product')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao deletar produto: ${error.message}`);
    }
  }
}

const productRepository = new ProductRepository();
export default productRepository;
