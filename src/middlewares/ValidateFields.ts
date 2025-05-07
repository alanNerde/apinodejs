import { NextFunction, Request, Response } from 'express';

export function validateFields(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const FieldsValidate = fields.filter(
      (fields) =>
        !(fields in req.body) ||
        req.body[fields] === '' ||
        req.body[fields] === null
    );

    if (FieldsValidate.length > 0) {
      return res.status(400).json({
        Error: 'Campos obrigatórios faltando: ' + FieldsValidate.join(', '),
      });
    }

    next();
  };
}
