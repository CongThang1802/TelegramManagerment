import { DeepPartial } from 'typeorm';
import { PersonEntity } from '../personEntity.abstraction';

export abstract class UpdatePersonDto<T extends PersonEntity> {
    name: string;
    phoneNumber: string;
    constructor(updatePersonData: DeepPartial<T>) {
        this.name = updatePersonData.name;
        this.phoneNumber = updatePersonData.phoneNumber;
    }
}
