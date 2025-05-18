import { ICreateClass } from '../modules/academic/academic.type';

export const generateClassName = (payload: ICreateClass) => {
    const group = payload.group !== 'NA' ? `-${payload.group}` : '';
    const section = payload.section !== 'NA' ? `-${payload.section}` : '';
    const curriculum = payload.curriculum === 'BRITISH' ? 'BC' : 'NC';
    const version = payload.curriculumVersion === 'ENGLISH' ? 'EN' : 'BN';
    const name = `${curriculum}_${version}_C${payload.grade}${group}${section}`;
    return name;
};
