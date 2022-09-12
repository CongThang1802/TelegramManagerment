import { Inject, Injectable } from '@nestjs/common';
import { Api } from 'telegram';
import { TelegramService } from '../../commonModules/telegram/telegram.service';
import { NotFoundHandler } from '../../utils/notFoundHandler';
import { ACCOUNT_REPOSITORY } from '../account/account.provider';
import { AccountRepository } from '../account/account.repository';

@Injectable()
export class ChannelService {
  constructor(private readonly telegramService:TelegramService,@Inject(ACCOUNT_REPOSITORY) private readonly accountRepository:AccountRepository){}
  async fetchChannel(accountId:string){
    const account = NotFoundHandler(await this.accountRepository.getOne(accountId));
    if(!account.session){
      throw new Error("Have not already connected");
    }
    const client = await this.telegramService.connectWithSession(account.apiId,account.apiHash,account.session);
    const result = await client.invoke(new Api.channels.GetChannels({
      id:[]
    }));
    return result;
  }
}
