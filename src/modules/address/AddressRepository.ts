import { getDB } from '../../database/connection';
import { Address } from './AddressModel';

class AddressRepository {
  async create(adress: Omit<Address, 'id'>): Promise<void> {
    const db = await getDB();
    const sql = `
      INSERT INTO ADDRESS (street,neighborhood,number,postal_code,city,complemente,type,customer,status)
      VALUES (?,?,?,?,?,?,?,?,?)
      `;
    await db.run(sql, [
      adress.street,
      adress.neighborhood,
      adress.number,
      adress.postal_code,
      adress.city,
      adress.complemente,
      adress.type,
      adress.customer,
      adress.status,
    ]);
  }

  async findAll(): Promise<Address[]> {
    const db = await getDB();
    const findAll = await db.all('SELECT * FROM ADDRESS');
    return findAll;
  }

  async findById(id: number): Promise<Address | null> {
    const db = await getDB();
    const findById = await db.get(`SELECT * FROM ADDRESS WHERE ID = ?`, [id]);
    return findById ?? null;
  }

  async update(id: number, dados: Partial<Omit<Address, 'id'>>): Promise<void> {
    const db = await getDB();
    let sqlSet = ``;
    const values: any[] = [];
    Object.entries(dados).forEach(([key, value]) => {
      values.push(value);
      sqlSet = sqlSet + `${key} = ?, `;
    });
    values.push(id);
    const posUltimaVirgula = sqlSet.lastIndexOf(',');
    sqlSet = sqlSet.slice(0, posUltimaVirgula);
    const sql = `UPDATE ADDRESS SET ${sqlSet} where id = ?`;
    await db.run(sql, values);
  }

  async delete(id: number): Promise<void> {
    const db = await getDB();
    db.run(`DELETE FROM ADDRESS WHERE ID = ${id}`);
  }
}

const addressRepository = new AddressRepository();
export default addressRepository;
