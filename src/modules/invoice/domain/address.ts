export interface AddressProps {
    street: string;
    number: number;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class Address {
    _street: string;
    _number: number;
    _complement?: string;
    _city: string;
    _state: string;
    _zipCode: string;

    constructor(props: AddressProps) {
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement;
        this._city = props.city;
        this._state = props.state;
        this._zipCode = props.zipCode;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }
    
    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    validate() {
        if (!this._street || this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (!this._number || this._number === 0) {
            throw new Error("Number is required");
        }
        if (!this._city || this._city.length === 0) {
            throw new Error("City is required");
        }
        if (!this._state || this._state.length === 0) {
            throw new Error("State is required");
        }
        if (!this._zipCode || this._zipCode.length === 0) {
            throw new Error("Zip is required");
        }
    }
    
}