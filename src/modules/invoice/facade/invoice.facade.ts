import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice.usecase';
import InvoiceFacadeInterface from './invoice.facade.interface';
import GenerateInvoiceUseCase from '../usecase/generate-invoice/generate-invoice.usecase';
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto, FindInvoiceInputDto, FindInvoiceOutputDTO } from './invoice.facade.dto';

export default class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(private findInvoiceUseCase: FindInvoiceUseCase, private generateInvoiceUseCase: GenerateInvoiceUseCase) {}

    generate(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {        
        return this.generateInvoiceUseCase.execute(input);
    }

    find(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDTO> {
        return this.findInvoiceUseCase.execute(input);
    }

}