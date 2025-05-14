import { z } from 'zod';

export const AddressSchema = z.object({
  //street,neighborhood,number,postal_code,city,complemente,type,customer,status
  street: z.string().min(1,'Rua não pode ser vazia'),
  neighborhood: z.string().min(1,'Bairro não pode ser vazio'),
  number: z.string().min(1,'Numero não pode ser vazio'),
  postal_code: z.number().int({message: 'não digite pontos ou virgulas'}).refine(
    (cep) => {
     const qtdDigit: number = String(cep).length;

     return qtdDigit === 8;
    }, {message: 'Cep deve ter 8 digitos'}
  )

});

export type AddressInput = z.infer<typeof AddressSchema>;
