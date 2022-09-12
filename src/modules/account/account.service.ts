import { Inject, Injectable } from '@nestjs/common';
import { FetchDto } from 'src/abstractions/dtoAbstractions/fetchDto.abstraction';
import { Context } from '../../commonModules/context/context';
import { TelegramService } from '../../commonModules/telegram/telegram.service';
import { CreateAccountDto, SendPhoneCodeDto } from './account.dto';
import { Account } from './account.entity';
import { ACCOUNT_REPOSITORY } from './account.provider';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
    constructor(
        @Inject(ACCOUNT_REPOSITORY)
        private accountRepository: AccountRepository,
        private telegramService: TelegramService
    ) {}

    async fetch(fetchQuery: FetchDto<Account>) {
        return await this.accountRepository.fetch(fetchQuery);
    }
    async getOne(id: string) {
        return await this.accountRepository.getOne(id);
    }
    async create(createAccountData: CreateAccountDto, ctx: Context) {
        const { apiId, apiHash, phoneNumber } = createAccountData;
        const session = await this.telegramService.connect(
            apiId,
            apiHash,
            phoneNumber
        );
        const id = ctx.id;
        return await this.accountRepository.create({
            userId: id,
            apiId,
            apiHash,
            phoneNumber,
            session,
        });
    }
    async sendPhoneCode(sendPhoneCodeData: SendPhoneCodeDto) {
        const { phoneNumber, phoneCode } = sendPhoneCodeData;
        return this.telegramService.emitPhoneCode(phoneNumber, phoneCode);
    }
    async delete(id:string) {
        return await this.accountRepository.deleteOne(id)
    }
}
