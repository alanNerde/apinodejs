import { Address } from './Address';
import addressRepository from './AddressRepository';

class AddressService{
  async create(objeto: Omit<Address, 'id'>): Promise<void>{
    await addressRepository.create(objeto);
  }
  async findAll(): Promise<Address[]>{
    return await addressRepository.findAll();
  }
  async find(id: number): Promise<void>{
    await addressRepository.findById(id);
  };

  async update(id: number, objeto: Partial<Omit<Address, 'id'>>): Promise<void> {
    await addressRepository.update(id, objeto);
  }

  async delete(id: number): Promise<void>{
    await addressRepository.delete(id);
  }
}

const addressService = new AddressService();
export default addressService;
