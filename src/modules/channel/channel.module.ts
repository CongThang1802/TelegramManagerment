import { Module } from '@nestjs/common';
import { TelegramModule } from '../../commonModules/telegram/telegram.module';
import { AccountModule } from '../account/account.module';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports:[TelegramModule,AccountModule],
  controllers: [ChannelController],
  providers: [ChannelService]
})
export class ChannelModule {}
