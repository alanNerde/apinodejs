import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { getSwaggerSpec } from './docs/swagger';
import routes from './routes/Index';

const app = express();

// Middleware de CORS com configuração específica
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para processar JSON com limite aumentado
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para lidar com erros de JSON malformado
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'O corpo da requisição contém JSON inválido'
    });
  }
  next(err);
});

// Configuração do Swagger
const swaggerDocument = getSwaggerSpec();

// Rota raiz que redireciona para a documentação
app.get('/', (_req: Request, res: Response) => {
  res.redirect('/docs');
});

// Rota de status da API
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da API
app.use('/api', routes);

// Middleware de erro 404 para rotas não encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'A rota solicitada não existe'
  });
});

// Middleware de tratamento de erros global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production'
      ? 'Ocorreu um erro interno no servidor'
      : err.message
  });
});

export default app;
