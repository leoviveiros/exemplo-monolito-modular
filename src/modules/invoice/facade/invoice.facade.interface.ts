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

export default interface InvoiceFacadeInterface {
    create(input: CreateInvoiceInputDto): Promise<CreateInvoiceOutputDto>;
}