import jwt from 'jsonwebtoken';
import config from '../config';
import { ROLE } from '@prisma/client';

export interface ITokenPayload {
    id: string;
    role: ROLE;
}

export const generateToken = (payload: ITokenPayload) => {
    return jwt.sign(payload, config.jwt_secret, {
        expiresIn: config.jwt_expire,
    });
};

export const decodeToken = (token: string) => {
    return jwt.verify(token, config.jwt_secret);
};
