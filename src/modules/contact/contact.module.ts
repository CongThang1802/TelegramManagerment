import { Module } from '@nestjs/common';
import { TelegramModule } from '../../commonModules/telegram/telegram.module';
import { AccountModule } from '../account/account.module';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports:[TelegramModule,AccountModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
