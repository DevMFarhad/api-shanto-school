import status from 'http-status';
import dbClient from '../../dbClient';
import AppError from '../../utils/appError';
import { bcryptHelpers } from '../../utils/bcryptHelpers';
import { generateToken, ITokenPayload } from '../../utils/jwtHelpers';
import { IChangePassword, ILoginPayload } from './auth.type';

/* ---------------<< Login User Service >>------------- */
const loginUser = async (payload: ILoginPayload) => {
    const isUserExist = await dbClient.user.findUniqueOrThrow({
        where: {
            id: payload.id,
        },
    });
    const isMatched = await bcryptHelpers.checkPassword(
        payload.password,
        isUserExist.password,
    );

    if (!isMatched) {
        throw new AppError('Password wrong.', status.UNAUTHORIZED);
    }

    // generate token:
    const tokenPayload = {
        id: isUserExist.id,
        role: isUserExist.role,
    };
    const token = generateToken(tokenPayload);

    return { token };
};

/* ---------------<< Change Password Service >>------------- */
const changePassword = async (
    user: ITokenPayload,
    payload: IChangePassword,
) => {
    const existUser = await dbClient.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
    });

    // check old password matched
    const isMatched = await bcryptHelpers.checkPassword(
        payload.oldPassword,
        existUser.password,
    );

    if (!isMatched) {
        throw new AppError('Password wrong.', status.UNAUTHORIZED);
    }

    // store new password
    const hashPassword = await bcryptHelpers.hashPassword(payload.newPassword);

    await dbClient.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashPassword,
            hasPasswordChanged: true,
        },
    });
};

export const AuthServices = { loginUser, changePassword };
