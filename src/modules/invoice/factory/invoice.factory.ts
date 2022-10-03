import InvoiceFacade from '../facade/invoice.facade';
import InvoiceFacadeInterface from '../facade/invoice.facade.interface';
import InvoiceRepository from '../repository/invoice.repository';
import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice.usecase';

export default class InvoiceFactory {

    public static create(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepository();
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

        return new InvoiceFacade(findInvoiceUseCase);
    }

}