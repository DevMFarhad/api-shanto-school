export interface IGenerateSearchableField {
    filterableFields?: string[];
    numberFilterableFields?: string[];
    searchFields?: string[];
}

export interface ISearchableField {
    field: string;
    search?: boolean;
    isNumber?: boolean;
}

const generateSearchableField = (payload: IGenerateSearchableField): ISearchableField[] => {
    const searchAbleFields: ISearchableField[] = [];
    const { searchFields, filterableFields, numberFilterableFields } = payload;

    if (searchFields && searchFields.length > 0) {
        searchFields.forEach((field: string) => {
            searchAbleFields.push({
                field: field,
                search: true,
            });
        });
    }

    if (numberFilterableFields && numberFilterableFields.length > 0) {
        numberFilterableFields.forEach((field: string) => {
            searchAbleFields.push({
                field: field,
                search: false,
                isNumber: true,
            });
        });
    }

    if (filterableFields && filterableFields.length > 0) {
        filterableFields.forEach((field: string) => {
            searchAbleFields.push({
                field: field,
                search: false,
                isNumber: false,
            });
        });
    }

    return searchAbleFields;
};

export default generateSearchableField;
