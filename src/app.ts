import express, { Express, Request, Response } from 'express';
import AppRouter from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Express = express();

/* --------------->> Parser <<------------ */
app.use(express.json());
app.use(express.urlencoded());

/* ---------->> Application Router <<----------- */
app.use('/', AppRouter);

/* -----------<< Global Error Handling >>---------  */
app.use(globalErrorHandler);

export default app;
