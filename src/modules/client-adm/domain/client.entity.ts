import AggregateRoot from '../../shared/domain/entity/aggregate-root.interface';
import BaseEntity from '../../shared/domain/entity/base.entity';
import Id from '../../shared/domain/value-object/id.value-object';

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    document: string;
    street: string;
    number: number;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _email: string;
    private _street: string;
    private _number: number;
    private _complement?: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._email = props.email;
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement;
        this._city = props.city;
        this._state = props.state;
        this._zipCode = props.zipCode;
    }

    public get name(): string {
        return this._name;
    }

    public get document(): string {
        return this._document;
    }

    public get email(): string {
        return this._email;
    }

    public get street(): string {
        return this._street;
    }

    public get number(): number {
        return this._number;
    }

    public get complement(): string | undefined {
        return this._complement;
    }

    public get city(): string {
        return this._city;
    }

    public get state(): string {
        return this._state;
    }

    public get zipCode(): string {
        return this._zipCode;
    }

}