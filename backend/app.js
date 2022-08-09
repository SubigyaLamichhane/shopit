import express from 'express';
import cookieParser from 'cookie-parser';

import products from './routes/product.js';
import errorMiddleware from './middlewares/errors.js';
import auth from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cookieParser);

//Api Routes
app.use('/api/v1', products);
app.use('api/v1', auth);

app.use(errorMiddleware);

export default app;
