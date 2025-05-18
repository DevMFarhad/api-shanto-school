import dbClient from '../../dbClient';
import { generateClassName } from '../../utils/academicUtils';
import { ICreateClass } from './academic.type';

/* -----------<< Create Class Service >>------------ */
const createClass = async (payload: ICreateClass) => {
    payload.group = payload.group || 'NA';
    payload.section = payload.section || 'NA';
    if (payload.curriculum == 'BRITISH') {
        payload.curriculumVersion = 'ENGLISH';
    }
    const name = generateClassName(payload);
    const response = await dbClient.class.create({
        data: {
            name,
            ...payload,
        },
    });

    return response;
};

export const AcademicServices = {
    createClass,
};
