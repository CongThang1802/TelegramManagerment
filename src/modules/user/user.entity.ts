import { Column, DeepPartial, Entity } from 'typeorm';
import { PersonEntity } from '../../abstractions/personEntity.abstraction';

@Entity({ name: 'users' })
export class User extends PersonEntity {
    constructor(userData: DeepPartial<User>) {
        super(userData);
    }
    @Column({ type: String })
    password: string;
}
