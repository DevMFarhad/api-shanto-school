import { Response } from 'express';

export interface IResMeta {
    total: number;
    limit: number;
    page: number;
}

export interface IResponsePayload<T> {
    message?: string | undefined;
    code?: number | undefined;
    data?: T | undefined;
    meta?: IResMeta | undefined;
}

const sendResponse = <T>(res: Response, payload: IResponsePayload<T>) => {
    res.status(payload?.code || 200).json({
        success: true,
        message: payload?.message || 'Success',
        meta: payload?.meta,
        data: payload?.data,
    });
};

export default sendResponse;
