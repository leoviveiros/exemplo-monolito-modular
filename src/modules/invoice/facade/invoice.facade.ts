import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice.usecase';
import { CreateInvoiceInputDto, CreateInvoiceOutputDto, FindInvoiceInputDto, FindInvoiceOutputDTO } from './invoice.facade.dto';
import InvoiceFacadeInterface from './invoice.facade.interface';

export default class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(private findInvoiceUseCase: FindInvoiceUseCase) {
    }

    create(input: CreateInvoiceInputDto): Promise<CreateInvoiceOutputDto> {
        throw new Error('Method not implemented.');
    }

    find(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDTO> {
        return this.findInvoiceUseCase.execute(input);
    }

}