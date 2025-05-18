/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { decodeToken, ITokenPayload } from '../utils/jwtHelpers';
import { ROLE } from '@prisma/client';
import dbClient from '../dbClient';
import AppError from '../utils/AppError';
import status from 'http-status';

const authChecker = (...roles: ROLE[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // get auth header
            const header = req.headers.authorization;
            if (!header) {
                throw new AppError('Authorization header is not found', status.UNAUTHORIZED);
            }

            // get token
            const token = header.split('Bearer ')[1];
            if (!token) {
                throw new AppError('Token is not found', status.UNAUTHORIZED);
            }

            // decode token
            const tokenDecode = decodeToken(token) as ITokenPayload;

            // check user role
            if (!roles.includes(tokenDecode.role)) {
                throw new AppError('You do not have access', status.UNAUTHORIZED);
            }

            // check user exist
            await dbClient.user.findUniqueOrThrow({
                where: {
                    id: tokenDecode.id,
                },
            });

            // set user in request
            req.user = {
                id: tokenDecode.id,
                role: tokenDecode.role,
            };

            next();
        } catch (error: any) {
            throw new AppError(error?.message as string, status.UNAUTHORIZED);
        }
    };
};

export default authChecker;
