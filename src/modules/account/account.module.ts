import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/commonModules/database/database.module';
import { TelegramModule } from '../../commonModules/telegram/telegram.module';
import { AccountController } from './account.controller';
import { AccountProviders } from './account.provider';
import { AccountService } from './account.service';

@Module({
    imports: [DatabaseModule, TelegramModule],
    controllers: [AccountController],
    providers: [...AccountProviders, AccountService],
    exports:[...AccountProviders]
})
export class AccountModule {}
