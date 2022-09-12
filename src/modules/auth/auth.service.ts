import { Inject, Injectable } from '@nestjs/common';
import { PasswordHelper } from 'src/commonModules/helpers/passwordHelper/passwordHelper';
import { TokenService } from '../../commonModules/token/token.service';
import { User } from '../user/user.entity';
import { UserRepository, USER_REPOSITORY } from '../user/user.repository';
import { Time } from './../../utils/time';
import { UserLoginDto, UserRegisterDto } from './auth.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly passwordHelper: PasswordHelper,
        private readonly tokenService: TokenService,
        @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository
    ) {}
    async userRegister(userRegisterData: UserRegisterDto) {
        const existedUser = await this.userRepository.findByEmailOrPhoneNumber(
            userRegisterData.email,
            userRegisterData.phoneNumber
        );
        if (existedUser) {
            throw new Error('Existed email or phone number');
        }
        const passwordHash = await this.passwordHelper.hashPassword(
            userRegisterData.password
        );
        const user = new User({ ...userRegisterData, password: passwordHash });
        return await this.userRepository.create(user);
    }
    async userLogin(userLoginData: UserLoginDto) {
        const { email, password } = userLoginData;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Email does not exist');
        }
        const isMatch = await this.passwordHelper.comparePassword(
            password,
            user.password
        );
        if (!isMatch) {
            throw new Error('Password does not match');
        }
        const token = await this.tokenService.sign(
            {
                id: user.id,
                email: user.email,
                phoneNumber: user.phoneNumber,
                name: user.name,
            },
            Time.Hour() * 12
        );
        return token;
    }
}
