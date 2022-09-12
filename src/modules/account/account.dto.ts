import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateObjectDto } from 'src/abstractions/dtoAbstractions/createObjectDto.abstraction';
import { DeepPartial } from 'typeorm';
import { ObjectRequiredMultiKey } from '../../utils/ObjectRequire';
import { ValidatePhoneNumber } from '../../utils/validatePhoneNumber';
import { Account } from './account.entity';

export class CreateAccountDto extends CreateObjectDto<Account> {
    apiId: number;
    apiHash: string;
    phoneNumber: string;
    constructor(createAccountData: DeepPartial<Account>) {
        super(createAccountData);
        this.apiId = createAccountData.apiId;
        this.apiHash = createAccountData.apiHash;
        this.phoneNumber = createAccountData.phoneNumber;
    }
}

export class UpdateAccountDto {
    contructor() {}
}

export class SendPhoneCodeDto {
    phoneCode: string;
    phoneNumber: string;
    constructor(sendPhoneCodeData: DeepPartial<SendPhoneCodeDto>) {
        this.phoneCode = sendPhoneCodeData.phoneCode;
        this.phoneNumber = sendPhoneCodeData.phoneNumber;
    }
}

@Injectable()
export class CastSendPhoneCodeDto implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            ObjectRequiredMultiKey(value, ['phoneCode', 'phoneNumber']);
            if(!ValidatePhoneNumber(value.phoneNumber)){
                throw new Error("Phone number is not valid")
            }
            return new SendPhoneCodeDto(value);
        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
        }
    }
}

@Injectable()
export class CastCreateAccountDto implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            ObjectRequiredMultiKey(value, ['apiId', 'apiHash', 'phoneNumber']);
            if(!ValidatePhoneNumber(value.phoneNumber)){
                throw new Error("Phone number is not valid")
            }
            if(!parseInt(value.apiId)){
                throw new Error("apiId is not valid")
            }
            return new CreateAccountDto({ ...value, apiId: parseInt(value.apiId) });
        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
        }
    }
}
