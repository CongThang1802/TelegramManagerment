import { Repository } from 'typeorm';
import { FetchDto } from '../dtoAbstractions/fetchDto.abstraction';
import { AbstractEntity } from '../entity.abstraction';
import { AbstractRepository } from './repository.abstraction';

export interface FetchResult<T> {
    page: number;
    total: number;
    limit: number;
    offset: number;
    hasMore: number;
    data: T[];
}

export abstract class PaginationRepository<
    T extends AbstractEntity
> extends AbstractRepository<T> {
    constructor(baseRepository: Repository<T>) {
        super(baseRepository);
    }
    async fetch(fetchQuery: FetchDto<T>) {
        const queryBuilder = this.baseRepository.createQueryBuilder();
        return await queryBuilder.getMany();
    }
}
