import { DeepPartial } from 'typeorm';
import { PersonEntity } from '../personEntity.abstraction';
export class CreatePersonDTO<T extends PersonEntity> {
    name: string;
    phoneNumber: string;
    email: string;
    constructor(personData: DeepPartial<T>) {
        this.name = personData.name;
        this.phoneNumber = personData.phoneNumber;
        this.email = personData.email;
    }
}
