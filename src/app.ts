// src/app.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import requestLogger from './middlewares/requestLogger';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger); // 👈 Use production logger

app.use('/api/products', productRoutes);
app.use(errorHandler);

export default app;
