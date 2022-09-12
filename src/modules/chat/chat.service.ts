import { Inject, Injectable } from '@nestjs/common';
import { Api } from 'telegram';
import { TelegramService } from '../../commonModules/telegram/telegram.service';
import { NotFoundHandler } from '../../utils/notFoundHandler';
import { ACCOUNT_REPOSITORY } from '../account/account.provider';
import { AccountRepository } from '../account/account.repository';

@Injectable()
export class ChatService {
  constructor(private readonly telegramService:TelegramService,@Inject(ACCOUNT_REPOSITORY) private readonly accountRepository:AccountRepository){}
  async fetchChat(accountId:string){
    const account = NotFoundHandler(await this.accountRepository.getOne(accountId));
    if(!account.session){
      throw new Error("Have not already connected");
    }
    const client = await this.telegramService.connectWithSession(account.apiId,account.apiHash,account.session);
    const chatResult = await client.invoke(new Api.messages.GetAllChats({
      exceptIds:[]
    }));
    return chatResult;
  }
}
