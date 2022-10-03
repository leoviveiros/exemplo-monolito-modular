import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto, FindInvoiceInputDto, FindInvoiceOutputDTO } from './invoice.facade.dto';

export default interface InvoiceFacadeInterface {
    generate(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto>;
    find(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDTO>;
}