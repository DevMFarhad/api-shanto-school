import { NextFunction, Request, Response } from 'express';
import config from '../config';

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let error = err?.stack;
    let message = err.message || 'Something went wrong';
    let statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: message,
        error: config.node_env === 'development' && error,
    });
};

export default globalErrorHandler;
