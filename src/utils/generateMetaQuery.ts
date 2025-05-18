export interface IMetaQueryPayload {
    limit?: string;
    page?: string;
}

const generateMetaQuery = (payload: IMetaQueryPayload) => {
    const limit = Number(payload?.limit) || 10;
    const page = Number(payload?.page) || 1;
    const skip = (page - 1) * limit;

    return {
        limit,
        page,
        skip,
    };
};

export default generateMetaQuery;
