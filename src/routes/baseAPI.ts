import { Router } from 'express';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import config from '../config';

const baseAPI = Router();

baseAPI.get(
    '/',
    catchAsync((req, res) => {
        sendResponse(res, {
            message: `Server running successfully.`,
            data: {
                name: config.app_name,
                baseApi: config.base_api,
            },
        });
    }),
);

export default baseAPI;
