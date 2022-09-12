import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post
} from '@nestjs/common';
import { FetchDto } from 'src/abstractions/dtoAbstractions/fetchDto.abstraction';
import { Context } from '../../commonModules/context/context';
import { Ctx } from '../../commonModules/context/ctx';
import {
    CastCreateAccountDto,
    CastSendPhoneCodeDto,
    CreateAccountDto,
    SendPhoneCodeDto
} from './account.dto';
import { Account } from './account.entity';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    async fetch(@Body() fetchQuery: FetchDto<Account>, @Ctx() ctx: Context) {
        this.accountService.fetch(fetchQuery);
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return await this.accountService.getOne(id);
    }

    @Post()
    async create(
        @Body(new CastCreateAccountDto()) createAccountData: CreateAccountDto,
        @Ctx() ctx: Context
    ) {
        try {
            return await this.accountService.create(createAccountData, ctx);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('sendPhoneCode')
    async sendPhoneCode(
        @Body(new CastSendPhoneCodeDto()) sendPhoneCodeData: SendPhoneCodeDto
    ) {
        try {
            return await this.accountService.sendPhoneCode(sendPhoneCodeData);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(":id")
    async delete(@Param("id") id :string) {
        try {
            return await this.accountService.delete(id)
        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
        }
    }
}
