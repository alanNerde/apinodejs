/**
 * @openapi
 * tags:
 *   - name: Customer
 *     description: Operações relacionadas a clientes
 *
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - cpf_cnpj
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           minLenght: 3"
 *           maxLenght: 100
 *           example: João Silva
 *         cpf_cnpj:
 *           type: string
 *           minLenght: 11
 *           maxLenght: 11
 *           pattern: '^(\d{11}|\d{14})$'
 *           example: 12345678900
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *         phone:
 *           type: string
 *           example: '(11) 99999-9999'
 *         birth_date:
 *           type: string
 *           exemple: yyyy-mm-dd
 *         status:
 *           type: string
 *           enum:
 *             - A
 *             - I
 *           exemple: A
 */

/**
 * @openapi
 * /customer:
 *   get:
 *     summary: Retorna a lista de todos os clientes
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Customer]
 *     requestBody:
 *       description: Dados para criação de um cliente
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Souza
 *               cpf:
 *                 type: string
 *                 example: 98765432100
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               telefone:
 *                 type: string
 *                 example: '(21) 98888-8888'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Dados inválidos
 *
 * /customers/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente não encontrado
 *
 *   put:
 *     summary: Atualiza um cliente pelo ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cliente
 *     requestBody:
 *       description: Dados para atualizar o cliente
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Souza
 *               cpf:
 *                 type: string
 *                 example: 98765432100
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               telefone:
 *                 type: string
 *                 example: '(21) 98888-8888'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente não encontrado
 *
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       204:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */

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
