import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassServices } from './class.service';

/* -----------<< Create Class Controller >>------------ */
const createClass = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await ClassServices.createClass(data);

    sendResponse(res, {
        code: status.CREATED,
        message: 'Class created successful',
        data: result,
    });
});

/* -----------<< Create Class Controller >>------------ */
const getClasses = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await ClassServices.getClasses(query);

    sendResponse(res, {
        message: 'Class retrieve successful',
        data: result.data,
        meta: result.meta,
    });
});

/* -----------<< Details Class Controller >>------------ */
const classDetails = catchAsync(async (req, res) => {
    const classId = req?.params?.classId;
    const result = await ClassServices.classDetails(classId);

    sendResponse(res, {
        message: 'Class retrieve successful',
        data: result,
    });
});

/* -----------<< Details Class Controller >>------------ */
const updateClass = catchAsync(async (req, res) => {
    const classId = req?.params?.classId;
    const data = req?.body;
    const result = await ClassServices.updateClass(classId, data);

    sendResponse(res, {
        message: 'Class update successful',
        data: result,
    });
});

/* -----------<< Details Class Controller >>------------ */
const deleteClass = catchAsync(async (req, res) => {
    const classId = req?.params?.classId;
    await ClassServices.deleteClass(classId);

    sendResponse(res, {
        message: 'Class delete successful',
    });
});

export const ClassControllers = {
    createClass,
    getClasses,
    classDetails,
    updateClass,
    deleteClass,
};
