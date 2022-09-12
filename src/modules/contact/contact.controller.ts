import { Controller, Get, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}


  @Get(":accountId")
  async fetch(@Param("accountId") accountId:string) {
    return await this.contactService.fetchContact(accountId);
  }
}
