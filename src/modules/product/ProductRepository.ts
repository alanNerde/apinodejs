import { getDB } from '../../database/connection';
import { Product } from './ProductModel';

class ProductRepository {
  async create(product: Omit<Product, 'id'>): Promise<void> {
    const db = await getDB();
    await db.run(
      `INSERT INTO product (name, description, price, status)
       VALUES (?, ?, ?, ?)`,
      [product.name, product.description, product.price, product.status]
    );
  }

  async findAll(): Promise<Product[]> {
    const db = await getDB();
    const products = await db.all('select * from products');
    return products;
  }

  async findById(id: number): Promise<Product | null> {
    const db = await getDB();
    const product = await db.get('select * from product where id = ?', [id]);
    return product ?? null;
  }

  async put(id: number, dados: Partial<Omit<Product, 'id'>>): Promise<void> {
    const db = await getDB();

    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(dados)) {
      if (value !== undefined && value !== null && value !== '') {
        fields.push(`${key} = ?`);
        values.push(value);
      }

      if (fields.length === 0) {
        throw new Error('Nenhum campo válido para atualizar');
      }

      const sql = `UPDATE PRODUCT SET ${fields.join(', ')} where id = ?`;
      values.push(id);

      await db.run(sql, values);
    }
  }

  async delete(id: number): Promise<void> {
    const db = await getDB();
    db.run(`DELETE FROM PRODUCT WHERE ID = ?`, [id]);
  }
}

const productRepository = new ProductRepository();
export default productRepository;
