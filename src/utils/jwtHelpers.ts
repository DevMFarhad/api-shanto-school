import jwt from 'jsonwebtoken';
import config from '../config';
import { Role } from '@prisma/client';

export interface ITokenPayload {
    id: string;
    role: Role;
}

export const generateToken = (payload: ITokenPayload) => {
    return jwt.sign(payload, config.jwt_secret, {
        expiresIn: config.jwt_expire,
    });
};

export const decodeToken = (token: string) => {
    return jwt.verify(token, config.jwt_secret);
};
