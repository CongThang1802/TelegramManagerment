import { Repository } from 'typeorm';
import { AbstractEntity } from '../entity.abstraction';

export abstract class AbstractRepository<T extends AbstractEntity> {
    protected baseRepository: Repository<T>;
    constructor(baseRepository: Repository<T>) {
        this.baseRepository = baseRepository;
    }
}
