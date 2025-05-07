import { NextFunction, Request, Response } from 'express';

export default function logUsuario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('user:', (req as any).user);
  next();
}
