import { z } from 'zod';

export const ProductSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório'),

  price: z
    .number({
      required_error: 'Preço é obrigatório',
      invalid_type_error: 'Preço deve ser um número',
    })
    .positive('Preço deve ser maior que zero'),

  status: z.enum(['A', 'I'], {
    required_error: 'Status é obrigatório',
    invalid_type_error: 'Status inválido, somente "A" ou "I"',
  }),

  description: z
    .string({ required_error: 'Descrição é obrigatória' })
    .min(1, 'Descrição é obrigatória')
    .max(500, 'Descrição pode ter no máximo 100 caracteres'),
});

export type ProductInput = z.infer<typeof ProductSchema>;
