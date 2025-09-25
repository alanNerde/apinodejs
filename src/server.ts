import dotenv from 'dotenv';
import app from './app';

dotenv.config();

// Na Vercel, não precisamos iniciar o servidor explicitamente
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

// Exporta a aplicação para a Vercel
export default app;
