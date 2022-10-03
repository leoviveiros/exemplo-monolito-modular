import Invoice from '../../domain/invoice.entity';
import InvoiceGateway from '../../gateway/invoice.gateway';
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from './generate-invoice.dto';


export default class GenerateInvoiceUseCase {

    constructor(private invoiceRepository: InvoiceGateway) { }

    async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            },
            items: input.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
        });

        const invoiceResult = await this.invoiceRepository.create(invoice);

        return {
            id: invoiceResult.id.id,
            name: invoiceResult.name,
            document: invoiceResult.document,
            street: invoiceResult.address.street,
            number: invoiceResult.address.number,
            complement: invoiceResult.address.complement,
            city: invoiceResult.address.city,
            state: invoiceResult.address.state,
            zipCode: invoiceResult.address.zipCode,
            items: invoiceResult.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoiceResult.total,            
        };
    }

}