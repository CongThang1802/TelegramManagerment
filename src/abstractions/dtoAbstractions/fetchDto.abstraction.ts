import { AbstractEntity } from '../entity.abstraction';

export type FetchFilter = Array<Map<string, string | number>>;

export abstract class FetchDto<T extends AbstractEntity> {
    page?: number;
    limit?: number;
    order?: number;
    orderBy?: [keyof T];
    filters?: FetchFilter;
    constructor(fetchQuery: FetchDto<T>) {
        this.page = fetchQuery.page || 0;
        this.limit = fetchQuery.limit || 10;
        this.order = fetchQuery.order || 1;
        this.orderBy = fetchQuery.orderBy;
        this.filters = fetchQuery.filters;
    }
}
