import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from '../src/routes/Index';
import { getDB } from './database/connection';

async function bootstrap() {
  await getDB();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', routes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

bootstrap();
