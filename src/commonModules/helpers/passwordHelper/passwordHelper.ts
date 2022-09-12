import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHelper {
    async hashPassword(rawPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(rawPassword, salt);
    }
    async comparePassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
