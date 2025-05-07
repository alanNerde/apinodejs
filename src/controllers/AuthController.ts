import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

export default new (class AuthController {
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const token = await AuthService.login(email, senha);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
})();
