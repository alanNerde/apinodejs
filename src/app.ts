import cors from 'cors';
import express from 'express';
import routes from '../src/routes/Index';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

export default app;
