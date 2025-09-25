import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from '../src/routes/Index';
import { getSwaggerSpec } from './docs/swagger';

const app = express();
app.use(express.json());
app.use(cors());

const swaggerDocument = getSwaggerSpec();

// Rota raiz que redireciona para a documentação
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// Rota de status da API
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

export default app;
