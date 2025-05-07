import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';
import { isValidCnpj } from '../../utils/validators/Cnpj';
import { isValidCpf } from '../../utils/validators/Cpf';
import { toDateOrNull } from '../../utils/validators/Data';

export const CustomerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf_cnpj: z
    .preprocess(
      (val) => (typeof val === 'string' ? val.replace(/\D/g, '') : val),
      z.string()
    )
    .refine(
      (digits): digits is string => {
        return digits.length === 11 || digits.length === 14;
      },
      { message: 'Digite 11 digitos para CPF ou 14 digitos para CNPJ' }
    )
    .refine((digits) => digits.length !== 14 || isValidCnpj(digits), {
      message: 'CNPJ inválido',
    })
    .refine((digits) => digits.length !== 11 || isValidCpf(digits), {
      message: 'CPF inválido',
    }),
  status: z.enum(['A', 'I']),
  phone: z.string().refine(
    (val) => {
      const phone = parsePhoneNumberFromString(val, 'BR');
      return phone?.isValid() ?? false;
    },
    {
      message: 'Telefone inválido',
    }
  ),
  birth_date: z.preprocess(
    (val: unknown) => val,
    z
      .string({
        required_error: 'Data é obrigatória',
        invalid_type_error: 'Tipo de dado inválido.',
      })
      .refine((fmt) => /^\d{4}-\d{2}-\d{2}$/.test(fmt), {
        message: 'Formato inválido. Use YYYY-MM-DD.',
      })
      .refine((s) => toDateOrNull(s) !== null, {
        message: 'Data inválida ou inexistente',
      })
      .transform((s) => toDateOrNull(s)!)
  ),
  email: z.string().email('E‑mail inválido'),
});
