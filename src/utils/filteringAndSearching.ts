/* eslint-disable @typescript-eslint/no-explicit-any */

import { ISearchableField } from './generateSearchableField';

interface IFilteringAndSearching {
    query: Record<string, string>;
    searchableFields: ISearchableField[];
    searchTerm?: string;
}

const filteringAndSearching = (params: IFilteringAndSearching) => {
    const { query, searchTerm, searchableFields } = params;

    const andConditions: any[] = [];
    const orConditions: any[] = [];

    for (const fieldObj of searchableFields) {
        const fieldName = fieldObj.field;
        const fieldInNumber = fieldObj.isNumber;

        const value = query[fieldName];

        // filtering
        if (value !== undefined && value !== null) {
            andConditions.push({ [fieldName]: !fieldInNumber ? value : Number(value) });
        }

        // searching
        if (searchTerm && fieldObj.search) {
            orConditions.push({
                [fieldName]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            });
        }
    }

    const whereCondition: any = {};

    if (andConditions.length > 0) {
        whereCondition.AND = andConditions;
    }

    if (orConditions.length > 0) {
        whereCondition.OR = orConditions;
    }

    return whereCondition;
};

export default filteringAndSearching;
