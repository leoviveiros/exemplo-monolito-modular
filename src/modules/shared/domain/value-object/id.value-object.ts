import ValueObject from './value-object.interface';
import { randomUUID } from 'crypto';

export default class Id implements ValueObject {
    private readonly _id: string;

    constructor(id?: string) {
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id;
    }

};
