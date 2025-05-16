import express, { Express, Request, Response } from 'express';
import AppRouter from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFoundHandler from './middlewares/notFoundHandler';

const app: Express = express();

/* --------------->> Parser <<------------ */
app.use(express.json());
app.use(express.urlencoded());

/* ---------->> Application Router <<----------- */
app.use('/', AppRouter);

/* -----------<< Global Error Handling >>---------  */
app.use(globalErrorHandler);

/* -----------<< Not found Handler >>---------  */
app.use(notFoundHandler);

export default app;
