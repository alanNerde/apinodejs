// preciso do express, do model, do schema e do service
import { Request, Response } from 'express';
import { Address } from './AddressModel';
import { AddressSchema } from './AddressSchema';
import addressService from './AddressService';

class AddressController {
  async getAll(req: Request, res: Response) {
    try {
      const address: Address[] = await addressService.findAll();
      return res.status(200).json(address);
    } catch (error) {
      console.log('Erro ao buscar endereço: ', error);
      return res.status(500).json({ message: 'Erro interno' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const addressValidado = AddressSchema.safeParse(req.body);
      if (!addressValidado.success) {
        return res.status(400).json({ errors: addressValidado.error.errors });
      }
    } catch (error) {}
  }
}

const addressController = new AddressController();
export default addressController;
