import { Module } from '@nestjs/common';
import { PasswordHelper } from './passwordHelper';
@Module({
    providers: [PasswordHelper],
    exports: [PasswordHelper],
})
export class PasswordHelperModule {}
