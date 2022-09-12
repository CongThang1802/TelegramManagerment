import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { User } from 'src/modules/user/user.entity';
import { ObjectRequiredMultiKey } from 'src/utils/ObjectRequire';
import { DeepPartial } from 'typeorm';
import { ValidateEmail } from '../../utils/validateEmail';
import { ValidatePhoneNumber } from '../../utils/validatePhoneNumber';

export class UserLoginDto {
    email: string;
    password: string;
    constructor(
        userLoginData: DeepPartial<{ email: string; password: string }>
    ) {
        this.email = userLoginData.email;
        this.password = userLoginData.password;
    }
}

export class UserRegisterDto {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    constructor(userRegisterData: DeepPartial<User>) {
        this.email = userRegisterData.email;
        this.password = userRegisterData.password;
        this.phoneNumber = userRegisterData.phoneNumber;
        this.name = userRegisterData.name;
    }
}

@Injectable()
export class CastUserLoginDto implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            ObjectRequiredMultiKey(value, ['email', 'password']);
            const isValid = ValidateEmail(value.email);
            if(!isValid){
                throw new Error("Email is not valid")
            }
            return new UserLoginDto(value);
        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
        }
    }
}

@Injectable()
export class CastUserRegisterDto implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            ObjectRequiredMultiKey(value, [
                'email',
                'password',
                'phoneNumber',
                'name',
            ]);
            if(!ValidateEmail(value.email)){
                throw new Error("Email is not valid");
            }
            if(value.password.length < 6){
                throw new Error("Password must have at least 6 characters");
            }
            if(!ValidatePhoneNumber(value.phoneNumber)){
                throw new Error("Phone number is not valid");
            }
            return new UserRegisterDto(value);
            
        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
        }
    }
}
