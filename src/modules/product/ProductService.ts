import { Product } from './ProductModel';
import productRepository from './ProductRepository';

class ProductService {
  async createProduct(product: Omit<Product, 'id'>) {
    await productRepository.create(product);
  }

  async listAllProduct(): Promise<Product[]> {
    return await productRepository.findAll();
  }

  async findProductById(id: number): Promise<Product | null> {
    return await productRepository.findById(id);
  }

  async updateProduct(
    id: number,
    dados: Partial<Omit<Product, 'id'>>
  ): Promise<void> {
    return await productRepository.put(id, dados);
  }

  async deleteProduct(id: number): Promise<void> {
    return await productRepository.delete(id);
  }
}

const productService = new ProductService();
export default productService;
