import { getDB } from '../../database/connection';
import { Customer } from './CustomerModel';

class CustomerRepository {
  async create(customer: Omit<Customer, 'id'>): Promise<void> {
    const db = await getDB();
    await db.run(
      `INSERT INTO CUSTOMER (name, cpf_cnpj, phone, email, birth_date, status)
      VALUES(?,?,?,?,?,?)`,
      [
        customer.name,
        customer.cpf_cnpj,
        customer.phone,
        customer.email,
        customer.birth_date,
        customer.status,
      ]
    );
  }

  async findAll(): Promise<Customer[]> {
    const db = await getDB();
    const customers = await db.all('SELECT * FROM CUSTOMER');
    return customers;
  }

  async findById(customerId: number): Promise<Customer | null> {
    const db = await getDB();
    const customer = await db.get('SELECT * FROM CUSTOMER WHERE ID = ?', [
      customerId,
    ]);
    return customer ?? null;
  }

  async update(
    id: number,
    dados: Partial<Omit<Customer, 'id'>>
  ): Promise<void> {
    const db = await getDB();

    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(dados)) {
      if (value !== undefined && value !== null && value !== '') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error('Nenhum campo válido para atualizar');
    }

    const sql = `UPDATE CUSTOMER SET ${fields.join(', ')} where id = ?`;
    values.push(id);

    await db.run(sql, values);
  }

  async delete(id: number): Promise<void> {
    const db = await getDB();
    await db.run(`DELETE FROM CUSTOMER WHERE ID = ?`, [id]);
  }
}

const customerRepository = new CustomerRepository();
export default customerRepository;
