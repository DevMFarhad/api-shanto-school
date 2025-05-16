/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const env = process.env;

const config = {
  app_name: env.APP_NAME as string,
  node_env: env.NODE_ENV as string,
  port: Number(env.PORT),
  base_api: process.env.BASE_API as string,
  base_url: process.env.BASE_URL as string
};

export default config;
