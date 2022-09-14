import AggregateRoot from '@shared/domain/entity/aggregate-root.interface';
import BaseEntity from '@shared/domain/entity/base.entity';
import Id from '../../shared/domain/value-object/id.value-object';
import Address, { AddressProps } from './address';
import Product, { ProductProps } from './product.entity';

export interface InvoiceProps {
    id?: string;
    name: string;
    document: string;
    address: AddressProps;
    items: ProductProps[];
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: Product[];

    constructor(props: InvoiceProps) {
        super(new Id(props.id));
        this._name = props.name;
        this._document = props.document;
        this._address = new Address(props.address);
        this._items = props.items.map((item) => new Product(item));

        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): Product[] {
        return this._items;
    }

    private validate() {
        if (!this._name || this._name.length === 0) {
            throw new Error('Name is required');
        }

        if (!this._document || this._document.length === 0) {
            throw new Error('Document is required');
        }

        if (!this._items || this._items.length === 0) {
            throw new Error('Items is required');
        }
    }
}