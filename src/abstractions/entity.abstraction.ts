import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: Date })
    createdAt: Date;

    @Column({ type: Date })
    updatedAt: Date;

    @BeforeInsert()
    private beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date();
    }
}
