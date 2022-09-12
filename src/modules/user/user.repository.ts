import { Repository } from 'typeorm';
import { CRUDRepository } from '../../abstractions/repositories/crudRepository.abstraction';
import { User } from './user.entity';

export class UserRepository extends CRUDRepository<User> {
    constructor(baseUserRepository: Repository<User>) {
        super(baseUserRepository);
    }

    async findByEmail(email: string) {
        return await this.baseRepository
            .createQueryBuilder()
            .where(`email = :email`, { email })
            .getOne();
    }

    async findByEmailOrPhoneNumber(email: string, phoneNumber: string) {
        return await this.baseRepository
            .createQueryBuilder()
            .where(`email = :email`, { email })
            .andWhere(`phoneNumber = :phoneNumber`, { phoneNumber })
            .getOne();
    }
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
