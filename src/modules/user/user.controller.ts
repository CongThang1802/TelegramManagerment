import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { FetchDto } from 'src/abstractions/dtoAbstractions/fetchDto.abstraction';
import { CastUpdateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async fetch(@Body() fetchQuery: FetchDto<User>) {
        return this.userService.fetch(fetchQuery);
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.userService.getOne(id);
    }


    @Put(':id')
    async update(@Param('id') id: string, @Body(new CastUpdateUserDto()) data: UpdateUserDto) {
        try {
            const updateUserData = new UpdateUserDto(data);
            return await this.userService.update(id, updateUserData);
        } catch (error) {}
    }
}
