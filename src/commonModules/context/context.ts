import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../modules/user/user.entity';
import { configFactory } from '../appConfig/configFactory';
import { TokenService } from './../token/token.service';

const tokenService = new TokenService(configFactory());
export class Context {
    private payload: Partial<User>;
    constructor(private request: Request) {}
    async parseToken() {
        try {
            const token = this.request.headers['x-token'];
            if (token) {
                const payload = await tokenService.verify(token as string);
                this.payload = payload;
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.FORBIDDEN);
        }
    }
    get id() {
        return this.payload.id;
    }
    get email() {
        return this.payload.email;
    }
}
