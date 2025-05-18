import { Prisma } from '@prisma/client';
import dbClient from '../../dbClient';
import { generateClassName } from '../../utils/academicUtils';
import { IClassesQuery, ICreateClass } from './class.type';
import generateMetaQuery from '../../utils/generateMetaQuery';
import filteringAndSearching from '../../utils/filteringAndSearching';
import generateSearchableField from '../../utils/generateSearchableField';
import {
    CLASS_FILTERABLE_FIELDS,
    CLASS_NUMBER_FILTERABLE_FIELDS,
    CLASS_SEARCHABLE_FIELDS,
} from './class.const';

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

/* -----------<< Get Class Service >>------------ */
const getClasses = async (allQuery: IClassesQuery) => {
    const { limit, page, searchTerm, ...query } = allQuery;
    const metaQuery = generateMetaQuery({
        limit,
        page,
    });

    const whereCondition: Prisma.ClassWhereInput = filteringAndSearching({
        query: query,
        searchableFields: generateSearchableField({
            searchFields: CLASS_SEARCHABLE_FIELDS,
            filterableFields: CLASS_FILTERABLE_FIELDS,
            numberFilterableFields: CLASS_NUMBER_FILTERABLE_FIELDS,
        }),
        searchTerm: searchTerm,
    });

    const data = await dbClient.class.findMany({
        where: whereCondition,
        skip: metaQuery.skip,
        take: metaQuery.limit,
        orderBy: {
            grade: 'asc',
        },
    });

    const total = await dbClient.class.count({
        where: whereCondition,
    });

    const meta = {
        limit: metaQuery.limit,
        page: metaQuery.page,
        total,
    };

    return { data, meta };
};

/* -----------<< Details Class Service >>------------ */
const classDetails = async (classId: string) => {
    const res = await dbClient.class.findUniqueOrThrow({
        where: {
            id: classId,
        },
    });

    return res;
};

/* -----------<< Update Class Service >>------------ */
const updateClass = async (classId: string, payload: ICreateClass) => {
    const existsClass = await dbClient.class.findUniqueOrThrow({
        where: {
            id: classId,
        },
    });

    payload.section = payload.section || existsClass.section;
    payload.group = payload.group || existsClass.group;
    payload.curriculum = payload.curriculum || existsClass.curriculum;

    if (payload.curriculum === 'BRITISH') {
        payload.curriculumVersion = 'ENGLISH';
    } else {
        payload.curriculumVersion = payload.curriculumVersion || existsClass.curriculumVersion;
    }
    payload.grade = payload.grade || existsClass.grade;

    const name = generateClassName(payload);

    const res = await dbClient.class.update({
        where: {
            id: classId,
        },
        data: {
            name,
            ...payload,
        },
    });

    return res;
};

/* -----------<< Delete Class Service >>------------ */
const deleteClass = async (classId: string) => {
    await dbClient.class.delete({
        where: {
            id: classId,
        },
    });
};

export const ClassServices = {
    createClass,
    getClasses,
    classDetails,
    updateClass,
    deleteClass,
};
