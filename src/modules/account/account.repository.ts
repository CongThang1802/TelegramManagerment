import { CRUDRepository } from 'src/abstractions/repositories/crudRepository.abstraction';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

export class AccountRepository extends CRUDRepository<Account> {
    constructor(baseAccountRepository: Repository<Account>) {
        super(baseAccountRepository);
    }
}
