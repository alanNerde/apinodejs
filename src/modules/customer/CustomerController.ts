import { Request, Response } from 'express';
import { CustomerSchema } from './CustomerSchema';
import CustomerService from './CustomerService';

export default new (class CustomerController {
  async getAll(req: Request, res: Response) {
    try {
      const clients = await CustomerService.listAllCustomer();
      return res.json(clients);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar clientes' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const resultZod = CustomerSchema.safeParse(req.body);
      if (!resultZod.success) {
        return res.status(400).json({ errors: resultZod.error.errors });
      }

      const dadosValidados = resultZod.data;

      await CustomerService.createCustomer(dadosValidados);
      return res
        .status(201)
        .json({ message: 'Cliente cadastrado com sucesso' });
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return res.status(500).json({ error: 'Erro interno ao criar cliente' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }
      const client = await CustomerService.findCustomerById(id);

      if (!client) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      return res.json(client);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar cliente' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      const { name, cpf_cnpj, phone, email, birth_date, status } = req.body;
      await CustomerService.updateCustomer(id, {
        name,
        cpf_cnpj,
        phone,
        email,
        birth_date,
        status,
      });

      return res
        .status(200)
        .json({ message: 'Cliente atualizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return res
        .status(500)
        .json({ error: 'Erro interno ao atualizar cliente' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      await CustomerService.deleteCustomer(id);

      return res.status(201).json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
      console.log('Erro ao deletar cliente:', error);
      return res.status(500).json({ error: 'Erro interno ao deletar cliente' });
    }
  }
})();
