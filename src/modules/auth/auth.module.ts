import { Module } from '@nestjs/common';
import { PasswordHelperModule } from 'src/commonModules/helpers/passwordHelper/passwordHelper.module';
import { DatabaseModule } from '../../commonModules/database/database.module';
import { TokenModule } from '../../commonModules/token/token.module';
import { UserProviders } from '../user/user.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [PasswordHelperModule, DatabaseModule, TokenModule],
    controllers: [AuthController],
    providers: [AuthService, ...UserProviders],
})
export class AuthModule {}
