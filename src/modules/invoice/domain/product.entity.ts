import BaseEntity from '@shared/domain/entity/base.entity';
import Id from '@shared/domain/value-object/id.value-object';

export interface ProductProps {
    id?: string;
    name: string;
    price: number;
}

export default class Product extends BaseEntity {
    private _name: string;
    private _price: number;

    constructor(props: ProductProps) {
        super(new Id(props.id));
        this._name = props.name;
        this._price = props.price;

        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    private validate() {
        if (!this._name || this._name.length === 0) {
            throw new Error('Name is required');
        }
        if (!this._price || this._price <= 0) {
            throw new Error('Price is required');
        }
    }
}