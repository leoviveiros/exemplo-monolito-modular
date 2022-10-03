export interface CreateInvoiceInputDto {
    name: string;
    address: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface CreateInvoiceOutputDto {
    id: string;
}

export interface FindInvoiceInputDto {
    id: string;
}

export interface FindInvoiceOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: number;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}