import { CreateInvoiceInputDto, CreateInvoiceOutputDto, FindInvoiceInputDto, FindInvoiceOutputDTO } from './invoice.facade.dto';

export default interface InvoiceFacadeInterface {
    create(input: CreateInvoiceInputDto): Promise<CreateInvoiceOutputDto>;
    find(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDTO>;
}