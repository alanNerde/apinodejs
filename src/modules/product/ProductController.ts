import { Request, Response } from 'express';
import { Product } from './ProductModel';
import { ProductSchema } from './ProductSchema';
import productService from './ProductService';

class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const products: Product[] = await productService.listAllProduct();
      return res.json(products);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar produtos' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const resultZod = ProductSchema.safeParse(req.body);
      if (!resultZod.success) {
        return res.status(400).json({ errors: resultZod.error.errors });
      }

      const dadosValidos = resultZod.data;

      await productService.createProduct(dadosValidos);
      return res.status(201).json({ teste: 'Produto cadastrado com sucesso' });
    } catch (testeError) {
      console.error('Erro ao criar produto:', testeError);
      return res.status(500).json({ error: 'Erro interno ao criar produto' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      if (isNaN(parseInt(req.params.id, 10))) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const product = await productService.findProductById(
        parseInt(req.params.id, 10)
      );

      if (!product) {
        res.status(400).json({ error: 'Produto não encontrado' });
      }
      return res.json(product);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar produto' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      await productService.updateProduct(id, req.body);

      return res
        .status(200)
        .json({ Message: 'Produto atualizado com sucesso.' });
    } catch (error) {
      console.error('Error ao atualizar produto', error);
      return res
        .status(500)
        .json({ error: 'Erro interno ao atualizar produto' });
    }
  }
}

const productController = new ProductController();
export default productController;
