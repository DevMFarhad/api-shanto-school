import { Request, Response } from "express"
import { AuthServices } from "./auth.service";
import { ILoginPayload } from "./auth.type";
import sendResponse from "../../utils/sendResponse";

/* ---------------<< Login User Controller >>------------- */
const loginUser = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AuthServices.loginUser(data as ILoginPayload);

    sendResponse(res, {
        message: 'Login Successful',
        data: result
    })
}








export const AuthControllers = { loginUser }