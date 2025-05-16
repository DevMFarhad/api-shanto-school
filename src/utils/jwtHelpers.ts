import jwt from 'jsonwebtoken';
import config from '../config';
import { Role } from '@prisma/client';

interface ITokenPayload {
    id: string;
    role: Role
}

export const generateToken = (payload: ITokenPayload) => {
    return jwt.sign(payload, config.jwt_secret);
}