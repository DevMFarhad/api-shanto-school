import express, { Express, Request, Response } from 'express';
import config from './config';

const app: Express = express();


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

export default app;
