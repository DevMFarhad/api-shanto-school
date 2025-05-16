import { Response } from 'express';

export interface IResponsePayload<T> {
    message?: string | undefined;
    code?: number | undefined;
    data?: T | undefined | null;
}

const sendResponse = <T>(res: Response, payload: IResponsePayload<T>) => {
    res.status(payload?.code || 200).json({
        success: true,
        message: payload?.message || 'Success',
        data: payload?.data || null,
    });
};

export default sendResponse;
