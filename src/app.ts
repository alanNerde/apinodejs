import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from '../src/routes/Index';
import { getSwaggerSpec } from './docs/swagger';

const app = express();
app.use(express.json());
app.use(cors());

const swaggerDocument = getSwaggerSpec();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

export default app;
