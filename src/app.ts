import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from '../src/routes/Index';
import swaggerSpec from './swagger';

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use('/api', routes);


export default app;
