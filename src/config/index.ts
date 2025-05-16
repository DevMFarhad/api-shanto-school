/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
    app_name: process.env.APP_NAME as string,
    node_env: process.env.NODE_ENV as string,
    port: Number(process.env.PORT),
    base_api: process.env.BASE_API as string,
    base_url: process.env.BASE_URL as string,
    super_admin_id: process.env.SUPER_ADMIN_ID as string,
    super_admin_pass: process.env.SUPER_ADMIN_PASS as string,
    bcrypt_salt: Number(process.env.BCRYPT_SALT),
    jwt_secret: process.env.JWT_SECRET as string,
    jwt_expire: process.env.JWT_EXPIRE as any,
};

export default config;
