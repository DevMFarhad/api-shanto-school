import express, { Express, Request, Response } from 'express';
import config from './config';
import AppRouter from './routes';

const app: Express = express();

/* --------------->> Parser <<------------ */
app.use(express.json())
app.use(express.urlencoded())


/* ------------> Base API <------------ */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `Server running successfully.`,
    data: {
      name: config.app_name,
      baseApi: config.base_api,
    }
  })
});

/* ---------->> Application Router <<----------- */
app.use('/', AppRouter)

export default app;
