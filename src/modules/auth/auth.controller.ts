import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post, UsePipes
} from '@nestjs/common';
import { CastUserLoginDto, UserLoginDto, UserRegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('user/login')
    @UsePipes(new CastUserLoginDto())
    async login(@Body() userLoginData: UserLoginDto) {
        try {
            const token = await this.authService.userLogin(userLoginData);
            return { token };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('user/register')
    async register(@Body() registerUserData: UserRegisterDto) {
        try {
            return await this.authService.userRegister(registerUserData);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
