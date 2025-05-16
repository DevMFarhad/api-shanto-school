import { NextFunction, Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import status from 'http-status';
import config from '../config';

const notFoundHandler = (req: Request, res: Response) => {
    sendResponse(res, {
        code: status.NOT_FOUND,
        message: 'API/route not found',
        data: {
            requestedURL: `${config.base_api}${req.path}`,
        },
    });
};

export default notFoundHandler;
