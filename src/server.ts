import dotenv from 'dotenv';
import app from './app';
import { getDB } from './database/connection';

dotenv.config();

async function bootstrap() {
  await getDB();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

bootstrap();
