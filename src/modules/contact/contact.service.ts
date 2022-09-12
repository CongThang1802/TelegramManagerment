import { Inject, Injectable } from '@nestjs/common';
import { Api } from 'telegram';
import { TelegramService } from '../../commonModules/telegram/telegram.service';
import { NotFoundHandler } from '../../utils/notFoundHandler';
import { Account } from '../account/account.entity';
import { ACCOUNT_REPOSITORY } from '../account/account.provider';
import { AccountRepository } from '../account/account.repository';

@Injectable()
export class ContactService {

  constructor(private readonly telegramService:TelegramService,@Inject(ACCOUNT_REPOSITORY) private accountRepository:AccountRepository){}


  async fetchContact(accountid:string){
    const account = NotFoundHandler<Account>(await this.accountRepository.getOne(accountid));
    if(!account.session){
      throw new Error("Have not already connected");
    }
    const client = await this.telegramService.connectWithSession(account.apiId,account.apiHash,account.session);
    const contacts = await client.invoke(new Api.contacts.GetContacts({}));
    return contacts;
  }
}
