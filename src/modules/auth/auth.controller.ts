import { AuthServices } from './auth.service';
import { IChangePassword, ILoginPayload } from './auth.type';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ITokenPayload } from '../../utils/jwtHelpers';

/* ---------------<< Login User Controller >>------------- */
const loginUser = catchAsync(async (req, res) => {
    const data = req.body as ILoginPayload;
    const result = await AuthServices.loginUser(data);

    sendResponse(res, {
        message: 'Login Successful',
        data: result,
    });
});

/* ---------------<< Change Password Controller >>------------- */
const changePassword = catchAsync(async (req, res) => {
    const data = req.body as IChangePassword;
    const user = req.user as ITokenPayload;
    await AuthServices.changePassword(user, data);

    sendResponse(res, {
        message: 'Password changed successfully',
    });
});

/* ---------------<< Change Password Controller >>------------- */
const myProfile = catchAsync(async (req, res) => {
    const user = req.user as ITokenPayload;
    const result = await AuthServices.myProfile(user);

    sendResponse(res, {
        message: 'Profile retrieve successful',
        data: result,
    });
});

export const AuthControllers = { loginUser, changePassword, myProfile };
