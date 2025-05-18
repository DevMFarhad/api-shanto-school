import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicServices } from './academic.service';

/* -----------<< Create Class Controller >>------------ */
const createClass = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await AcademicServices.createClass(data);

    sendResponse(res, {
        code: status.CREATED,
        message: 'Class created successful',
        data: result,
    });
});

export const AcademicControllers = {
    createClass,
};
