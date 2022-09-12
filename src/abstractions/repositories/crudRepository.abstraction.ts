import { NotFoundHandler } from 'src/utils/notFoundHandler';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AbstractEntity } from '../entity.abstraction';
import { PaginationRepository } from './paginationRepository.abstraction';

export abstract class CRUDRepository<
    T extends AbstractEntity
> extends PaginationRepository<T> {
    constructor(baseRepository: Repository<T>) {
        super(baseRepository);
    }

    async getOne(id: string) {
        return await this.baseRepository
            .createQueryBuilder()
            .where(`id = :id`, { id })
            .getOne();
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const doc = this.baseRepository.create(data);
        return await this.baseRepository.save(doc);
    }

    async updateOne(id: string, data: QueryDeepPartialEntity<T>) {
        const doc = NotFoundHandler(
            await this.baseRepository
                .createQueryBuilder()
                .where(`id = :id`, { id })
                .getOne()
        );
        await this.baseRepository
            .createQueryBuilder()
            .update()
            .set(data)
            .where(`id = :id`, { id })
            .execute();
        return doc;
    }

    async deleteOne(id: string) {
        const doc = NotFoundHandler(
            await this.baseRepository
                .createQueryBuilder()
                .where(`id = :id`, { id })
                .getOne()
        );

        await this.baseRepository
            .createQueryBuilder()
            .delete()
            .where(`id = :id`, { id })
            .execute();
        return doc;
    }
}
