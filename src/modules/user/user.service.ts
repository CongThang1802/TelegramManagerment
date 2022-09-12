import { Inject, Injectable } from '@nestjs/common';
import { FetchDto } from 'src/abstractions/dtoAbstractions/fetchDto.abstraction';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserRepository, USER_REPOSITORY } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY) private userRepository: UserRepository
    ) {}

    async fetch(fetchQuery: FetchDto<User>) {
        return await this.userRepository.fetch(fetchQuery);
    }

    async getOne(id: string) {
        return await this.userRepository.getOne(id);
    }

    async update(id: string, updateUserData: UpdateUserDto) {
        return await this.userRepository.updateOne(id, updateUserData);
    }
}
