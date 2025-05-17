/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import config from '../config';

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const error = err?.stack;
    const message = err.message || 'Something went wrong';
    const statusCode: number = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: message,
        error: config.node_env === 'development' && error,
    });
};

export default globalErrorHandler;
