import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
// import cors from 'cors';
import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import routes from './routes';

const { PORT = 3000 } = process.env;
const app = express();
const allowedOrigins = [
    'http://103.76.53.240',          
    'http://localhost:3001',         
    'https://rshifter.nomorepartiessite.ru',   
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));
  
mongoose.connect(process.env.MONGODB_URI || DB_ADDRESS);

// Только для локальных тестов. Не используйте это в продакшене
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
