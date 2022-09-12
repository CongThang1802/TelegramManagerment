import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/commonModules/database/database.module';
import { UserController } from './user.controller';
import { UserProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [...UserProviders, UserService],
})
export class UserModule {}
