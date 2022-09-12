import * as _ from 'lodash';
import { Column, DeepPartial, Index } from 'typeorm';
import { AbstractEntity } from './entity.abstraction';

export abstract class PersonEntity extends AbstractEntity {
    constructor(personData: DeepPartial<PersonEntity>) {
        super();
        _.merge(this, personData);
    }
    @Index({ unique: true })
    @Column({ type: String })
    email: string;

    @Index({ unique: true })
    @Column({ type: String })
    name: string;

    @Column({ type: String })
    phoneNumber: string;
}
