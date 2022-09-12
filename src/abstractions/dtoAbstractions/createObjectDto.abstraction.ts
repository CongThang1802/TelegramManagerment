import { DeepPartial } from 'typeorm';
import { ObjectEntity } from '../objectEntity.abstraction';

export abstract class CreateObjectDto<T extends ObjectEntity> {
    constructor(createObjectData: DeepPartial<T>) {}
}
