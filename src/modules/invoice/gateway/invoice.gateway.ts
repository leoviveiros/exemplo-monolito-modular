import Invoice from '../domain/invoice.entity';

export default interface InvoiceGateway {
    find(id: string): Promise<Invoice>;
    create(invoice: Invoice): Promise<Invoice>;
}