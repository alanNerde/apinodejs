import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDB } from '../database/connection';

export default new (class AuthService {
  async login(email: string, senha: string) {
    const db = await getDB();
    const user = await db.get(
      'SELECT * FROM usuario WHERE email = ? AND status = "A"',
      [email]
    );

    if (!user || !bcrypt.compareSync(senha, user.senha)) {
      throw new Error('Email ou senha inválidos');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'defaultsecret',
      {
        expiresIn: '1h',
      }
    );

    return token;
  }
})();
