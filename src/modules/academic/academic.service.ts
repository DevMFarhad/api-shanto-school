import { Prisma } from '@prisma/client';
import dbClient from '../../dbClient';
import { generateClassName } from '../../utils/academicUtils';
import { IClassesQuery, ICreateClass } from './academic.type';
import generateMetaQuery from '../../utils/generateMetaQuery';
import filteringAndSearching from '../../utils/filteringAndSearching';
import generateSearchableField from '../../utils/generateSearchableField';
import {
    CLASS_FILTERABLE_FIELDS,
    CLASS_NUMBER_FILTERABLE_FIELDS,
    CLASS_SEARCHABLE_FIELDS,
} from './academic.const';

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

export const AcademicServices = {
    createClass,
    getClasses,
};
