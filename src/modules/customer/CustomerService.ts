import { Customer } from './CustomerModel';
import CustomerRepository from './CustomerRepository';

export default new (class ClientService {
  async createCustomer(customer: Omit<Customer, 'id'>) {
    await CustomerRepository.create(customer);
  }

  async listAllCustomer(): Promise<Customer[]> {
    return CustomerRepository.findAll();
  }

  async findCustomerById(id: number): Promise<Customer | null> {
    return CustomerRepository.findById(id);
  }

  async updateCustomer(id: number, customer: Omit<Customer, 'id'>) {
    await CustomerRepository.update(id, customer);
  }

  async deleteCustomer(id: number): Promise<void> {
    await CustomerRepository.delete(id);
  }
})();
