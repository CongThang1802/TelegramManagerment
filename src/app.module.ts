import { Module } from '@nestjs/common';
import { AppConfigModule } from './commonModules/appConfig/appConfig.module';
import { DatabaseModule } from './commonModules/database/database.module';
import { TelegramModule } from './commonModules/telegram/telegram.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChannelModule } from './modules/channel/channel.module';
import { ChatModule } from './modules/chat/chat.module';
import { ContactModule } from './modules/contact/contact.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        DatabaseModule,
        AppConfigModule,
        UserModule,
        TelegramModule,
        AccountModule,
        AuthModule,
        ContactModule,
        ChatModule,
        ChannelModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
