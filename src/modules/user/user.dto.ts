import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UpdatePersonDto } from 'src/abstractions/dtoAbstractions/updatePersonDto.abstraction';
import { DeepPartial } from 'typeorm';
import { User } from './user.entity';

export class UpdateUserDto extends UpdatePersonDto<User> {
    constructor(updateUserData: DeepPartial<User>) {
        super(updateUserData);
    }
}

export class UserOverViewDto {
    constructor(user:User){
        const {password,createdAt,updatedAt,...userData} = user;
        return userData;
    }
}

export class UserDetailsDto {
    constructor(user:User){
        const {password,...userData} = user;
        return userData;
    }
}

@Injectable()
export class CastUpdateUserDto implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return new UpdateUserDto(value);
    }
}
