import { Module } from '@nestjs/common';
import { TelegramModule } from '../../commonModules/telegram/telegram.module';
import { AccountModule } from '../account/account.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports:[TelegramModule,AccountModule],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
