import { Request, Response } from 'express';
import { AuthServices } from './auth.service';
import { ILoginPayload } from './auth.type';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

/* ---------------<< Login User Controller >>------------- */
const loginUser = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await AuthServices.loginUser(data);

    sendResponse(res, {
        message: 'Login Successful',
        data: result,
    });
});

/* ---------------<< Change Password Service >>------------- */
const changePassword = catchAsync(async (req, res) => {
    const data = req.body;
    const user = req.user;
    const result = await AuthServices.changePassword(user, data);

    sendResponse(res, {
        message: 'Password changed successfully',
    });
});

export const AuthControllers = { loginUser, changePassword };
