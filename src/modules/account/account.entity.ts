import { Column, Entity } from 'typeorm';
import { ObjectEntity } from '../../abstractions/objectEntity.abstraction';

@Entity({ name: 'accounts' })
export class Account extends ObjectEntity {
    @Column({ type: String, nullable: true })
    userId: string;

    @Column({ type: Number })
    apiId: number;

    @Column({ type: String })
    apiHash: string;

    @Column({ type: String })
    phoneNumber: string;

    @Column({ type: String, nullable: true, length: 1000 })
    session: string;
}
