import * as _ from 'lodash';
import { DeepPartial } from 'typeorm';
import { AbstractEntity } from './entity.abstraction';

export abstract class ObjectEntity extends AbstractEntity {
    constructor(objectData: DeepPartial<ObjectEntity>) {
        super();
        _.merge(this, objectData);
    }
}
